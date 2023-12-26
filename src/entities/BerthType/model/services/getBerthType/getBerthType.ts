import { ThunkConfig } from "@/app/providers/StoreProvider";
import { BerthType } from "@/entities/BerthType";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface GetBerthTypeProps {
    id: string;
}

export const getBerthType = createAsyncThunk<
    BerthType,
    GetBerthTypeProps,
    ThunkConfig<string>
>("berthType/getBerth", async ({ id }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<BerthType>(`/berthtypes/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Тип должности не найден!");
    }
});
