import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateEmployeeProps {
    data: Employee;
    workspaceId: string | undefined;
}

export const createEmployee = createAsyncThunk<
    Employee,
    CreateEmployeeProps,
    ThunkConfig<string>
>("employee/createEmployee", async ({ data, workspaceId }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.post<Employee>(
            "/employees/create",
            data,
            {
                params: {
                    workspaceId,
                },
            },
        );

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Произошла ошибка при создании сотрудника!");
    }
});
