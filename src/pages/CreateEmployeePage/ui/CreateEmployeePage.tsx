import { Employee } from "@/entities/Employee";
import { EmployeeDetailsForm } from "@/features/Employees/employeeDetailsCard";
import {
    getEmployeeDetailsForm,
    getEmployeeDetailsFormAvatar,
} from "@/features/Employees/employeeDetailsCard/model/selectors/getEmployeeDetails";
import { fetchEmployeeDetailsById } from "@/features/Employees/employeeDetailsCard/model/services/fetchEmployeeDetailsById/fetchEmployeeDetailsById";
import { updateEmployeeAvatar } from "@/features/Employees/employeeDetailsCard/model/services/updateEmployeeAvatar/updateEmployeeAvatar";
import { updateEmployeeDetailsById } from "@/features/Employees/employeeDetailsCard/model/services/updateEmployeeDetailsById/updateEmployeeDetailsById";
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
    // const isLoadingData = useSelector(getEmployeeDetailsIsDataLoading);
    // const employeeDetails = useSelector(getEmployeeDetails);
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);
    const frmAvatar = useSelector(getEmployeeDetailsFormAvatar);
    // const isInitialized = useSelector(getEmployeeDetailsIsInitialized);
    // const needAvatarDelete = useSelector(
    //     getEmployeeDetailsRemoveAvatarOnUpdate,
    // );

    const onSave = useCallback(async () => {
        // Создаем сотрудника
        await dispatch(
            updateEmployeeDetailsById({ employee: employeeDetailsForm! }),
        ).then(async (response) => {
            // Получаем сотрудника из запроса
            const employee = response.payload as Employee;

            // Обновляем аватар
            if (frmAvatar && employee?.id) {
                const blob = await fetch(frmAvatar).then((r) => r.blob());
                await dispatch(
                    updateEmployeeAvatar({
                        employeeId: employee.id,
                        file: blob,
                    }),
                );
            }

            // Обновляем список сотрудников
            await dispatch(fetchEmployeeDetailsById({ id: employee.id! })).then(
                (r) => {
                    // Обновляем запись в списке сотрудников
                    const employee = r.payload as Employee;

                    if (employee) {
                        dispatch(
                            employeesInfiniteListActions.updateEmployee(
                                employee,
                            ),
                        );

                        navigate(-1);
                    }
                },
            );
        });
    }, [dispatch, employeeDetailsForm, frmAvatar, navigate]);

    const onCancel = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card title={"Новый сотрудник"}>
                <EmployeeDetailsForm onSave={onSave} onCancel={onCancel} />
            </Card>
        </DynamicModuleLoader>
    );
};

export default memo(CreateEmployeePage);
