import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee/model/types/Employee";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface FetchEmployeeDetailsByIdProps {
    id: string;
}

export const fetchEmployeeDetailsById = createAsyncThunk<
    Employee,
    FetchEmployeeDetailsByIdProps,
    ThunkConfig<string>
>("employee/fetchEmployeeDetailsById", async ({ id }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        if (!id) {
            return rejectWithValue(
                "Идентификатор сотрудника не задан! (fetchEmployeeDetailsById)",
            );
        }
        const response = await extra.api.get<Employee | ServerError>(
            `/employees/${id}`,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        if (response.status === 400) {
            const serverError = response.data as ServerError;
            return rejectWithValue(serverError.error);
        }

        return response.data as Employee;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Сотрудник не найден!");
    }
});
