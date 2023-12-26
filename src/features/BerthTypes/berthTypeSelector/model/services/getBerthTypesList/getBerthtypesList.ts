import { ThunkConfig } from "@/app/providers/StoreProvider";
import { BerthType } from "@/entities/BerthType";
import { ServerError } from "@/shared/error/ServerError";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface GetBerthTypesListProps {
    workspaceId: string | undefined;
    organizationId: string | undefined;
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const getBerthTypesList = createAsyncThunk<
    FetchRowsResult<BerthType>,
    GetBerthTypesListProps,
    ThunkConfig<string>
>("getBerthTypesList", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const { workspaceId, organizationId } = props;

    if (!workspaceId) {
        return rejectWithValue("Рабочее пространство неизвестно!");
    }

    if (!organizationId) {
        return rejectWithValue("Организация не задана!");
    }

    try {
        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<BerthType>>(
            "/berthtypes",
            {
                params: {
                    workspaceId,
                    organizationId,
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
        return rejectWithValue("Ошибка при получении списка организаций");
    }
});
