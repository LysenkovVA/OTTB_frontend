import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee";
import { Organization } from "@/entities/Organization";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateEmployeeProps {
    employee: Employee;
    workspaceId: string;
}

export const createEmployee = createAsyncThunk<
    Employee,
    CreateEmployeeProps,
    ThunkConfig<string>
>("employee/createDepartment", async ({ employee, workspaceId }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.post<Organization>(
            "/employees/create",
            { ...employee, id: undefined },
            {
                params: {
                    workspaceId,
                },
            },
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        // dispatch(employeesInfiniteListActions.addOne(response.data));

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
