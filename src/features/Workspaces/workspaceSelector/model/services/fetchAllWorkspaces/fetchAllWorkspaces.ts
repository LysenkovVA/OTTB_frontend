import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Workspace } from "@/entities/Workspace";
import { ServerError } from "@/shared/error/ServerError";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export interface FetchAllWorkspacesProps {
    replaceData?: boolean;
}

export const fetchAllWorkspaces = createAsyncThunk<
    FetchRowsResult<Workspace>,
    FetchAllWorkspacesProps,
    ThunkConfig<string>
>("fetchAllWorkspaces", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    try {
        // Отправляем запрос
        const response =
            await extra.api.get<FetchRowsResult<Workspace>>("/workspaces");

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

        return rejectWithValue(
            "Ошибка при получении списка рабочих пространств",
        );
    }
});
