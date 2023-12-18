import { getUserActiveWorkspaceId } from "@/entities/User";
import { EmployeeDetailsForm } from "@/features/Employees/employeeDetailsCard";
import {
    getEmployeeDetailsForm,
    getEmployeeDetailsFormAvatar,
} from "@/features/Employees/employeeDetailsCard/model/selectors/getEmployeeDetails";
import { createEmployee } from "@/features/Employees/employeeDetailsCard/model/services/createEmployee/createEmployee";
import { fetchEmployeeDetailsById } from "@/features/Employees/employeeDetailsCard/model/services/fetchEmployeeDetailsById/fetchEmployeeDetailsById";
import { updateEmployeeAvatar } from "@/features/Employees/employeeDetailsCard/model/services/updateEmployeeAvatar/updateEmployeeAvatar";
import { employeeDetailsReducer } from "@/features/Employees/employeeDetailsCard/model/slice/employeeDetailsSlice";
import { employeesInfiniteListActions } from "@/features/Employees/employeesInfiniteList/model/slice/employeesInfiniteListSlice";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Card } from "antd";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface CreateEmployeePageProps {
    className?: string;
}

const reducers: ReducersList = {
    employeeDetailsSchema: employeeDetailsReducer,
};

const CreateEmployeePage = (props: CreateEmployeePageProps) => {
    const { className } = props;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);
    const frmAvatar = useSelector(getEmployeeDetailsFormAvatar);
    const activeWorkspaceId = useSelector(getUserActiveWorkspaceId);

    const onSave = useCallback(async () => {
        if (employeeDetailsForm) {
            try {
                // Создаем сотрудника
                const employee = await dispatch(
                    createEmployee({
                        employee: employeeDetailsForm,
                        workspaceId: activeWorkspaceId,
                    }),
                ).unwrap();

                // Если сотрудник создан
                if (employee?.id) {
                    // Обновляем аватар
                    if (frmAvatar && employee.id) {
                        const blob = await fetch(frmAvatar).then((r) =>
                            r.blob(),
                        );
                        await dispatch(
                            updateEmployeeAvatar({
                                employeeId: employee.id,
                                file: blob,
                            }),
                        );
                    }

                    // Получаем свежие данные сотрудника из БД
                    const updatedEmployee = await dispatch(
                        fetchEmployeeDetailsById({ id: employee.id }),
                    ).unwrap();

                    // Добавляем в список сотрудников
                    dispatch(
                        employeesInfiniteListActions.addOne(updatedEmployee),
                    );

                    navigate(-1);
                }
            } catch {}
        }
    }, [activeWorkspaceId, dispatch, employeeDetailsForm, frmAvatar, navigate]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card title={"Новый сотрудник"}>
                <EmployeeDetailsForm
                    onSave={onSave}
                    onCancel={() => navigate(-1)}
                />
            </Card>
        </DynamicModuleLoader>
    );
};

export default memo(CreateEmployeePage);
