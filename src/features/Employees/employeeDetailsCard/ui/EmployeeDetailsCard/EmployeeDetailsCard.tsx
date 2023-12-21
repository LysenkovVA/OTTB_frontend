import { deleteEmployee } from "@/features/Employees/employeeDetailsCard/model/services/deleteEmployee/deleteEmployee";
import { removeEmployeeAvatar } from "@/features/Employees/employeeDetailsCard/model/services/removeEmployeeAvatar/removeEmployeeAvatar";
import { updateEmployee } from "@/features/Employees/employeeDetailsCard/model/services/updateEmployee/updateEmployee";
import { updateEmployeeAvatar } from "@/features/Employees/employeeDetailsCard/model/services/updateEmployeeAvatar/updateEmployeeAvatar";
import { employeesInfiniteListActions } from "@/features/Employees/employeesInfiniteList/model/slice/employeesInfiniteListSlice";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
import { ViewWrapper } from "@/shared/ui/ViewWrapper";
import { InfiniteScrollPage } from "@/widgets/InfiniteScrollPage";
import { useForm } from "antd/es/form/Form";
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

interface EmployeeDetailsCardProps {
    className?: string;
}

const reducers: ReducersList = {
    employeeDetailsSchema: employeeDetailsReducer,
};

export const EmployeeDetailsCard = memo((props: EmployeeDetailsCardProps) => {
    const { className } = props;

    const [form] = useForm();
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

    const onDelete = useCallback(async () => {
        if (employeeId) {
            try {
                await dispatch(deleteEmployee({ employeeId }));
                dispatch(employeesInfiniteListActions.removeOne(employeeId));
                navigate(-1);
            } catch {}
        }
    }, [dispatch, employeeId, navigate]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <InfiniteScrollPage>
                {isEditMode ? (
                    <EditFormWrapper
                        title={`${employeeDetailsForm?.surname} ${employeeDetailsForm?.name}`}
                        form={form}
                        onSave={onSave}
                        onCancel={onCancel}
                    >
                        <EmployeeDetailsForm form={form} />
                    </EditFormWrapper>
                ) : (
                    <ViewWrapper
                        title={`${employeeDetailsForm?.surname} ${employeeDetailsForm?.name}`}
                        deleteText={`Удалить ${employeeDetailsForm?.surname} ${employeeDetailsForm?.name}?`}
                        onEditClick={() => setIsEditMode(true)}
                        onDeleteClick={onDelete}
                    >
                        <EmployeeDetailsView />
                    </ViewWrapper>
                )}
            </InfiniteScrollPage>
        </DynamicModuleLoader>
    );
});
