import {
    getEmployeeDetailsAvatarChanged,
    getEmployeeDetailsDataChanged,
    getEmployeeDetailsForm,
    getEmployeeDetailsFormAvatar,
} from "@/entities/Employee";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { EmployeeDetailsForm } from "@/features/Employees/editEmployee/ui/EmployeeDetailsForm/EmployeeDetailsForm";
import { createEmployee } from "@/features/Employees/employeesInfiniteList/model/services/createEmployee/createEmployee";
import { deleteEmployeeAvatar } from "@/features/Employees/employeesInfiniteList/model/services/deleteEmployeeAvatar/deleteEmployeeAvatar";
import { updateEmployee } from "@/features/Employees/employeesInfiniteList/model/services/updateEmployee/updateEmployee";
import { updateEmployeeAvatar } from "@/features/Employees/employeesInfiniteList/model/services/updateEmployeeAvatar/updateEmployeeAvatar";
import { FilesHelper } from "@/shared/helpers/FilesHelper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

export interface EditEmployeeProps {
    className?: string;
    onUpdated: () => void;
    onCanceled: () => void;
}

export const EditEmployee = memo((props: EditEmployeeProps) => {
    const { className, onUpdated, onCanceled } = props;

    const [form] = useForm();
    const dispatch = useAppDispatch();
    const detailsForm = useSelector(getEmployeeDetailsForm);
    const workspaceId = useSelector(getUserActiveWorkspaceId);
    const formAvatar = useSelector(getEmployeeDetailsFormAvatar);
    const dataChanged = useSelector(getEmployeeDetailsDataChanged);
    const avatarChanged = useSelector(getEmployeeDetailsAvatarChanged);

    const onSave = useCallback(async () => {
        if (detailsForm) {
            try {
                if (!detailsForm.id) {
                    // Создаем запись
                    const newEmployee = await dispatch(
                        createEmployee({
                            data: detailsForm,
                            workspaceId,
                        }),
                    ).unwrap();

                    // Добавляем аватар только если он выбран
                    if (avatarChanged && newEmployee?.id && formAvatar) {
                        await dispatch(
                            updateEmployeeAvatar({
                                employeeId: newEmployee?.id,
                                file: await FilesHelper.getBlobFromString(
                                    formAvatar,
                                ),
                            }),
                        );
                    }

                    onUpdated();
                } else {
                    // Обновляем запись
                    if (dataChanged) {
                        await dispatch(
                            updateEmployee({
                                id: detailsForm.id,
                                data: detailsForm,
                            }),
                        );
                    }

                    if (avatarChanged) {
                        if (formAvatar) {
                            // Обновляем аватар
                            await dispatch(
                                updateEmployeeAvatar({
                                    employeeId: detailsForm.id,
                                    file: await FilesHelper.getBlobFromString(
                                        formAvatar,
                                    ),
                                }),
                            );
                        } else {
                            // Удаляем аватар
                            await dispatch(
                                deleteEmployeeAvatar({
                                    employeeId: detailsForm.id,
                                }),
                            );
                        }
                    }

                    onUpdated();
                }
            } catch {}
        }
    }, [
        detailsForm,
        dispatch,
        workspaceId,
        formAvatar,
        onUpdated,
        dataChanged,
        avatarChanged,
    ]);

    return (
        <EditFormWrapper
            title={
                detailsForm?.id
                    ? `${detailsForm?.surname} ${detailsForm?.name}`
                    : "Новый сотрудник"
            }
            form={form}
            onSaveClick={onSave}
            onBackClick={onCanceled}
        >
            <EmployeeDetailsForm form={form} />
        </EditFormWrapper>
    );
});
