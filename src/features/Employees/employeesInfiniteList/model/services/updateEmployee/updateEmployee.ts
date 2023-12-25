import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee/model/types/Employee";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosHeaders } from "axios";

export interface UpdateEmployeeDetailsByIdProps {
    id: string;
    data: Employee;
    file?: Blob;
}

export const updateEmployee = createAsyncThunk<
    Employee,
    UpdateEmployeeDetailsByIdProps,
    ThunkConfig<string>
>("employee/updateEmployee", async ({ id, data, file }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

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

        const response = await extra.api.patch<Employee>(
            `/employees/${id}`,
            formData,
            {
                headers,
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

        return rejectWithValue("Произошла ошибка при обновлении сотрудника!");
    }
});
