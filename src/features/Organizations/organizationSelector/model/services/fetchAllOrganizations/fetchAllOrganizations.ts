import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Organization } from "@/entities/Organization";
import { ServerError } from "@/shared/error/ServerError";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export interface FetchAllOrganizationsProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchAllOrganizations = createAsyncThunk<
    FetchRowsResult<Organization>,
    FetchAllOrganizationsProps,
    ThunkConfig<string>
>("organizations/fetchAllOrganizations", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    try {
        // Отправляем запрос
        const response =
            await extra.api.get<FetchRowsResult<Organization>>(
                "/organizations",
            );

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

        return rejectWithValue("Ошибка при получении списка организаций");
    }
});
