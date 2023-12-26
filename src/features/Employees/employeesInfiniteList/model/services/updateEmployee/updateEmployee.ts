import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee/model/types/Employee";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateEmployeeDetailsByIdProps {
    id: string;
    data: Employee;
}

export const updateEmployee = createAsyncThunk<
    Employee,
    UpdateEmployeeDetailsByIdProps,
    ThunkConfig<string>
>("updateEmployee", async ({ id, data }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<Employee>(`/employees/${id}`, {
            ...data,
            id: undefined,
        });

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Произошла ошибка при обновлении сотрудника!");
    }
});
