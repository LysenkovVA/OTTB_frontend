import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Department } from "@/entities/Department";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { ServerError } from "@/shared/error/ServerError";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
    getDepartmentsInfiniteListLimit,
    getDepartmentsInfiniteListOffset,
} from "../../selectors/departmentsInfiniteListSelectors";

export interface FetchDepartmentsInfiniteListProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchDepartmentsInfiniteList = createAsyncThunk<
    FetchRowsResult<Department>,
    FetchDepartmentsInfiniteListProps,
    ThunkConfig<string>
>("departments/fetchDepartmentsInfiniteList", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const workspaceId = getUserActiveWorkspaceId(getState());
    const limit = getDepartmentsInfiniteListLimit(getState());
    const offset = getDepartmentsInfiniteListOffset(getState());

    if (!workspaceId) {
        return rejectWithValue("Рабочее пространство неизвестно!");
    }

    try {
        const response = await extra.api.get<FetchRowsResult<Department>>(
            "/departments",
            {
                params: {
                    workspaceId,
                    limit,
                    offset,
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
