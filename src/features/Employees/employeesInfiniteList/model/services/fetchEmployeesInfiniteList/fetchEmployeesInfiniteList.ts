import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Employee } from "@/entities/Employee";
import { getUserActiveWorkspace } from "@/entities/User";
import { ServerError } from "@/shared/error/ServerError";
import { addQueryParams } from "@/shared/lib/url/addQueryParams";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
    getEmployeesInfiniteListLimit,
    getEmployeesInfiniteListOffset,
    getEmployeesInfiniteListSearchQuery,
} from "../../selectors/employeesInfiniteListSelectors";

export interface FetchEmployeesInfiniteListProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchEmployeesInfiniteList = createAsyncThunk<
    FetchRowsResult<Employee>,
    FetchEmployeesInfiniteListProps,
    ThunkConfig<string>
>("employees/fetchEmployeesInfiniteList", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const workspace = getUserActiveWorkspace(getState());
    const limit = getEmployeesInfiniteListLimit(getState());
    const offset = getEmployeesInfiniteListOffset(getState());
    const searchQuery = getEmployeesInfiniteListSearchQuery(getState());

    try {
        // Добавляем параметры в строку запроса
        addQueryParams({
            searchQuery,
        });

        if (!workspace?.id) {
            return rejectWithValue("Рабочее пространство неизвестно!");
        }

        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<Employee>>(
            "/employees",
            {
                params: {
                    workspaceId: workspace.id,
                    limit,
                    offset,
                    searchQuery,
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

        return rejectWithValue(JSON.stringify(e));
    }
});
