import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee/model/types/Employee";
import { employeesInfiniteListActions } from "@/features/Employees/employeesInfiniteList/model/slice/employeesInfiniteListSlice";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateEmployeeDetailsByIdProps {
    employee: Employee;
}

export const updateEmployeeDetailsById = createAsyncThunk<
    Employee,
    UpdateEmployeeDetailsByIdProps,
    ThunkConfig<string>
>("employee/updateEmployeeDetailsById", async ({ employee }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        let response = null;

        if (employee.id) {
            response = await extra.api.patch<Employee | ServerError>(
                `/employees/${employee.id}`,
                {
                    ...employee,
                },
            );
        } else {
            response = await extra.api.post<Employee | ServerError>(
                "/employees/create",
                {
                    ...employee,
                },
            );
        }

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        if (response.status === 400) {
            const serverError = response.data as ServerError;
            return rejectWithValue(serverError.error);
        }

        if (employee.id) {
            dispatch(
                employeesInfiniteListActions.updateEmployee(
                    response.data as Employee,
                ),
            );
        } else {
            dispatch(
                employeesInfiniteListActions.addEmployee(
                    response.data as Employee,
                ),
            );
        }

        return response.data as Employee;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Ошибка при обновлении данных сотрудника!");
    }
});
