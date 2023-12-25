import {
    getEmployeeDetailsForm,
    getEmployeeDetailsFormAvatar,
} from "@/entities/Employee";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { EmployeeDetailsForm } from "@/features/Employees/editEmployee/ui/EmployeeDetailsForm/EmployeeDetailsForm";
import { createEmployee } from "@/features/Employees/employeesInfiniteList/model/services/createEmployee/createEmployee";
import { updateEmployee } from "@/features/Employees/employeesInfiniteList/model/services/updateEmployee/updateEmployee";
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

    const onSave = useCallback(async () => {
        if (detailsForm) {
            try {
                if (!detailsForm.id) {
                    // Создаем запись
                    await dispatch(
                        createEmployee({
                            data: detailsForm,
                            workspaceId,
                            file: await FilesHelper.getBlobFromString(
                                formAvatar,
                            ),
                        }),
                    );
                } else {
                    // Обновляем запись
                    await dispatch(
                        updateEmployee({
                            id: detailsForm.id,
                            data: detailsForm,
                            file: await FilesHelper.getBlobFromString(
                                formAvatar,
                            ),
                        }),
                    );
                }

                onUpdated();
            } catch {}
        }
    }, [detailsForm, onUpdated, dispatch, workspaceId, formAvatar]);

    return (
        <EditFormWrapper
            title={
                detailsForm?.id ? `${detailsForm?.surname}` : "Новый сотрудник"
            }
            form={form}
            onSaveClick={onSave}
            onBackClick={onCanceled}
        >
            <EmployeeDetailsForm form={form} />
        </EditFormWrapper>
    );
});
