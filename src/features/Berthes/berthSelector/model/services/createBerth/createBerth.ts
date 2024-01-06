import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Berth } from "@/entities/Berth";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateBerthProps {
    data: Berth;
    workspaceId: string | undefined;
}

export const createBerth = createAsyncThunk<
    Berth,
    CreateBerthProps,
    ThunkConfig<string>
>(
    "berthes/createConstructionObject",
    async ({ data, workspaceId }, thunkApi) => {
        const { dispatch, extra, rejectWithValue, getState } = thunkApi;

        if (!workspaceId) {
            return rejectWithValue("Рабочее пространство неизвестно!");
        }

        try {
            const response = await extra.api.post<Berth>(
                "/berthes/create",
                { ...data, id: undefined },
                {
                    params: {
                        workspaceId,
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

            return rejectWithValue("Произошла ошибка при создании должности!");
        }
    },
);
