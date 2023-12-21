import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Berth } from "@/entities/Berth";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { ServerError } from "@/shared/error/ServerError";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export interface FetchAllBerthesProps {
    replaceData?: boolean; // Для использования в action.meta.arg
    organizationId?: string;
}

export const fetchAllBerthes = createAsyncThunk<
    FetchRowsResult<Berth>,
    FetchAllBerthesProps,
    ThunkConfig<string>
>("berthes/fetchAllBerthes", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const { organizationId } = props;

    const workspaceId = getUserActiveWorkspaceId(getState());

    try {
        if (!workspaceId) {
            return rejectWithValue("Рабочее пространство неизвестно!");
        }

        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<Berth>>(
            "/berthes",
            {
                params: {
                    workspaceId,
                    organizationId,
                },
            },
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
        return rejectWithValue("Ошибка при получении списка органзизаций");
    }
});
