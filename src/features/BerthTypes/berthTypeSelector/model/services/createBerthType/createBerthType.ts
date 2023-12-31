import { ThunkConfig } from "@/app/providers/StoreProvider";
import { BerthType } from "@/entities/BerthType";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateBerthTypeProps {
    data: BerthType;
    workspaceId: string | undefined;
}

export const createBerthType = createAsyncThunk<
    BerthType,
    CreateBerthTypeProps,
    ThunkConfig<string>
>("createBerthType", async ({ data, workspaceId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!workspaceId) {
        return rejectWithValue("Рабочее пространство неизвестно!");
    }

    try {
        const response = await extra.api.post<BerthType>(
            "/berth-types/create",
            { ...data, id: undefined },
            {
                params: {
                    workspaceId,
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

        return rejectWithValue("Произошла ошибка при создании типа должности!");
    }
});
