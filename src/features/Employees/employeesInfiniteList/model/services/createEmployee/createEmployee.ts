import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosHeaders } from "axios";

export interface CreateEmployeeProps {
    data: Employee;
    workspaceId: string;
    file?: Blob;
}

export const createEmployee = createAsyncThunk<
    Employee,
    CreateEmployeeProps,
    ThunkConfig<string>
>("employee/createEmployee", async ({ data, workspaceId, file }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const formData = new FormData();

        // Данные
        if (data) {
            Object.keys(data).forEach((key) => {
                // @ts-ignore
                if (data[key]) {
                    // @ts-ignore
                    formData.append(key, data[key]);
                }
            });
        }

        // Аватар
        if (file) {
            formData.append("avatar", file, "avatar");
        }

        const headers = new AxiosHeaders();
        headers.setContentType("multipart/form-data");

        const response = await extra.api.post<Employee>(
            "/employees/create",
            formData,
            {
                headers,
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
