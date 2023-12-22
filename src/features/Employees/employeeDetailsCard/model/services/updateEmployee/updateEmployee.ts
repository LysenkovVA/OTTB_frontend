import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee/model/types/Employee";
import { employeesInfiniteListActions } from "@/features/Employees/employeesInfiniteList/model/slice/employeesInfiniteListSlice";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateEmployeeDetailsByIdProps {
    employee: Employee;
}

export const updateEmployee = createAsyncThunk<
    Employee,
    UpdateEmployeeDetailsByIdProps,
    ThunkConfig<string>
>("employee/updateDepartment", async ({ employee }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<Employee>(
            `/employees/${employee.id}`,
            employee,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        dispatch(employeesInfiniteListActions.setOne(response.data));

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Произошла ошибка при обновлении организации!");
    }
});
