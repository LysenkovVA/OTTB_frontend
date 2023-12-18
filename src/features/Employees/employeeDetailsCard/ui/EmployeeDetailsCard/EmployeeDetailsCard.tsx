import { deleteEmployee } from "@/features/Employees/employeeDetailsCard/model/services/deleteEmployee/deleteEmployee";
import { removeEmployeeAvatar } from "@/features/Employees/employeeDetailsCard/model/services/removeEmployeeAvatar/removeEmployeeAvatar";
import { updateEmployee } from "@/features/Employees/employeeDetailsCard/model/services/updateEmployee/updateEmployee";
import { updateEmployeeAvatar } from "@/features/Employees/employeeDetailsCard/model/services/updateEmployeeAvatar/updateEmployeeAvatar";
import { employeesInfiniteListActions } from "@/features/Employees/employeesInfiniteList/model/slice/employeesInfiniteListSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { InfiniteScrollPage } from "@/widgets/InfiniteScrollPage";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Modal, Typography } from "antd";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getEmployeeDetails,
    getEmployeeDetailsForm,
    getEmployeeDetailsFormAvatar,
    getEmployeeDetailsIsDataLoading,
    getEmployeeDetailsIsInitialized,
    getEmployeeDetailsRemoveAvatarOnUpdate,
} from "../../model/selectors/getEmployeeDetails";
import { fetchEmployeeDetailsById } from "../../model/services/fetchEmployeeDetailsById/fetchEmployeeDetailsById";
import {
    employeeDetailsActions,
    employeeDetailsReducer,
} from "../../model/slice/employeeDetailsSlice";
import { EmployeeDetailsForm } from "../EmployeeDetailsForm/EmployeeDetailsForm";
import { EmployeeDetailsView } from "../EmployeeDetailsView/EmployeeDetailsView";
import cls from "./EmployeeDetailsCard.module.scss";

interface EmployeeDetailsCardProps {
    className?: string;
}

const reducers: ReducersList = {
    employeeDetailsSchema: employeeDetailsReducer,
};

export const EmployeeDetailsCard = memo((props: EmployeeDetailsCardProps) => {
    const { className } = props;

    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const [isEditMode, setIsEditMode] = useState(false);

    const { id: employeeId } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getEmployeeDetailsIsDataLoading);
    const isInitialized = useSelector(getEmployeeDetailsIsInitialized);
    const employeeDetails = useSelector(getEmployeeDetails);
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);
    const formAvatar = useSelector(getEmployeeDetailsFormAvatar);
    const needAvatarDelete = useSelector(
        getEmployeeDetailsRemoveAvatarOnUpdate,
    );

    useInitialEffect(() => {
        if (!isInitialized && !isLoading && employeeId) {
            dispatch(fetchEmployeeDetailsById({ id: employeeId }));
        }
    });

    const onSave = useCallback(async () => {
        if (employeeDetailsForm) {
            try {
                await dispatch(
                    updateEmployee({
                        employee: employeeDetailsForm,
                    }),
                );

                // Обновляем аватар
                if (!needAvatarDelete && formAvatar && employeeDetails?.id) {
                    const blob = await fetch(formAvatar).then((r) => r.blob());
                    await dispatch(
                        updateEmployeeAvatar({
                            employeeId: employeeDetails.id,
                            file: blob,
                        }),
                    );
                }

                // Удаляем аватар
                if (needAvatarDelete) {
                    await dispatch(
                        removeEmployeeAvatar({
                            fileId: employeeDetails?.avatar?.id,
                        }),
                    );
                }

                setIsEditMode(false);
                // Возврат к списку
                navigate(-1);
            } catch {}
        }
    }, [
        dispatch,
        employeeDetails?.avatar?.id,
        employeeDetails?.id,
        employeeDetailsForm,
        formAvatar,
        navigate,
        needAvatarDelete,
    ]);

    const onCancel = useCallback(() => {
        if (employeeDetails) {
            dispatch(employeeDetailsActions.setFormData(employeeDetails));
        }

        dispatch(employeeDetailsActions.setEmployeeDetailsFormDataAvatar(""));
        dispatch(employeeDetailsActions.setRemoveAvatarOnUpdate(false));

        setIsEditMode(false);
    }, [dispatch, employeeDetails]);

    const onDelete = useCallback(
        async (id: string | undefined) => {
            if (id) {
                try {
                    await dispatch(deleteEmployee({ employeeId: id }));
                    dispatch(employeesInfiniteListActions.removeOne(id));
                    navigate(-1);
                } catch {}
            }
        },
        [dispatch, navigate],
    );

    const extraContent = (
        <>
            <Modal
                title="Подтвердите удаление"
                centered
                open={modalOpen}
                onOk={() => {
                    if (employeeDetails) {
                        setModalOpen(false);
                        onDelete?.(employeeDetails.id);
                    }
                }}
                onCancel={() => setModalOpen(false)}
                okButtonProps={{ danger: true }}
                okText={"Удалить"}
                cancelText={"Отмена"}
            >
                <Flex gap={8}>
                    <DeleteOutlined style={{ color: "red" }} />
                    <Typography.Text>{`Удалить '${employeeDetails?.surname} ${employeeDetails?.name}'?`}</Typography.Text>
                </Flex>
            </Modal>
            {!isEditMode ? (
                <Flex gap={8}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => setIsEditMode(true)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => setModalOpen(true)}
                    />
                </Flex>
            ) : null}
        </>
    );

    // const onEditClick = useCallback(() => {
    //     setCanEdit(false);
    // }, []);
    //
    // const onSaveClick = useCallback(async () => {
    //     await dispatch(updateEmployee({ employee: employeeDetailsForm! }));
    //
    //     // Обновляем аватар
    //     if (!needAvatarDelete && formAvatar && employeeDetails?.id) {
    //         const blob = await fetch(formAvatar).then((r) => r.blob());
    //         await dispatch(
    //             updateEmployeeAvatar({
    //                 employeeId: employeeDetails.id,
    //                 file: blob,
    //             }),
    //         );
    //     }
    //
    //     // Удаляем аватар
    //     if (needAvatarDelete) {
    //         await dispatch(
    //             removeEmployeeAvatar({ fileId: employeeDetails?.avatar?.id }),
    //         );
    //     }
    //
    //     // Получаем новые данные
    //     if (employeeDetails) {
    //         await dispatch(
    //             fetchEmployeeDetailsById({ id: employeeDetails.id! }),
    //         ).then((r) => {
    //             // Обновляем запись в списке сотрудников
    //             const employee = r.payload as Employee;
    //
    //             if (employee) {
    //                 dispatch(employeesInfiniteListActions.setOne(employee));
    //             }
    //         });
    //     }
    //
    //     setCanEdit(true);
    // }, [
    //     dispatch,
    //     employeeDetails,
    //     employeeDetailsForm,
    //     formAvatar,
    //     needAvatarDelete,
    // ]);
    //
    // const onCancelClick = useCallback(() => {
    //     // Возвращаем обратно значения сотрудника
    //     dispatch(
    //         employeeDetailsActions.setEmployeeDetailsFormData({
    //             ...employeeDetails,
    //         }),
    //     );
    //     // Возвращаем обратно значение аватара
    //     dispatch(employeeDetailsActions.setEmployeeDetailsFormDataAvatar(""));
    //     dispatch(employeeDetailsActions.setRemoveAvatarOnUpdate(false));
    //     setCanEdit(true);
    // }, [dispatch, employeeDetails]);
    //
    // const extraContent = (
    //     <>
    //         {canEdit ? (
    //             <Button type={"dashed"} onClick={onEditClick}>
    //                 Править
    //             </Button>
    //         ) : null}
    //     </>
    // );
    //
    // const onSubmitForm = useCallback(() => {}, []);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <InfiniteScrollPage>
                <Card
                    extra={extraContent}
                    title={`${employeeDetailsForm?.surname} ${employeeDetailsForm?.name}`}
                    className={classNames(cls.EmployeeDetailsCard, {}, [
                        className,
                    ])}
                    size={"small"}
                >
                    {isEditMode ? (
                        <EmployeeDetailsForm
                            onSave={onSave}
                            onCancel={onCancel}
                        />
                    ) : (
                        <EmployeeDetailsView />
                    )}
                </Card>
            </InfiniteScrollPage>
        </DynamicModuleLoader>
    );
});
