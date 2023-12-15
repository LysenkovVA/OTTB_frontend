import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Inspection } from "@/entities/Inspection";
import { ServerError } from "@/shared/error/ServerError";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
    getInspectionInfiniteListOffset,
    getInspectionsInfiniteListLimit,
} from "../../selectors/inspectionsInfiniteListSelectors";

export interface FetchInspectionsInfiniteListProps {
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchInspectionsInfiniteList = createAsyncThunk<
    FetchRowsResult<Inspection>,
    FetchInspectionsInfiniteListProps,
    ThunkConfig<string>
>("inspections/fetchInspectionsInfiniteList", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    // Получаем параметры из стейта
    const limit = getInspectionsInfiniteListLimit(getState());
    const offset = getInspectionInfiniteListOffset(getState());

    try {
        const response = await extra.api.get<FetchRowsResult<Inspection>>(
            "/inspections",
            {
                params: {
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
