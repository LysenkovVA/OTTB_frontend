import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Department } from "@/entities/Department";
import { ServerError } from "@/shared/error/ServerError";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export interface FetchAllDepartmentsProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchAllDepartments = createAsyncThunk<
    FetchRowsResult<Department>,
    FetchAllDepartmentsProps,
    ThunkConfig<string>
>("departments/fetchAllDepartments", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    try {
        // Отправляем запрос
        const response =
            await extra.api.get<FetchRowsResult<Department>>("/departments");

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Ошибка при получении списка участков");
    }
});
