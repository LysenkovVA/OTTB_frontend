import { ThunkConfig } from "@/app/providers/StoreProvider";

import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface DeleteBerthTypeProps {
    id: string;
}

export const deleteBerthType = createAsyncThunk<
    void,
    DeleteBerthTypeProps,
    ThunkConfig<string>
>("deleteBerthType", async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // Отправляем запрос
        const response = await extra.api.delete(`/berthtypes/${props.id}`);

        return undefined;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }
        return rejectWithValue("Ошибка при удалении типа должности");
    }
});
