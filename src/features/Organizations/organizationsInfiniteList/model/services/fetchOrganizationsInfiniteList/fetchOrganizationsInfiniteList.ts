import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Organization } from "@/entities/Organization";

import { ServerError } from "@/shared/error/ServerError";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
    getOrganizationsInfiniteListLimit,
    getOrganizationsInfiniteListOffset,
} from "../../selectors/organizationsInfiniteListSelectors";

export interface FetchOrganizationsInfiniteListProps {
    workspaceId: string;
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchOrganizationsInfiniteList = createAsyncThunk<
    FetchRowsResult<Organization>,
    FetchOrganizationsInfiniteListProps,
    ThunkConfig<string>
>("organizations/fetchOrganizationsInfiniteList", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const { workspaceId } = props;

    // Получаем параметры из стейта
    const limit = getOrganizationsInfiniteListLimit(getState());
    const offset = getOrganizationsInfiniteListOffset(getState());

    if (!workspaceId) {
        return rejectWithValue("Рабочее пространство неизвестно!");
    }

    try {
        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<Organization>>(
            "/organizations",
            {
                params: {
                    workspaceId,
                    limit,
                    offset,
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
