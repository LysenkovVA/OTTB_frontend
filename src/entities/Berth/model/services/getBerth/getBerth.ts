import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Berth } from "@/entities/Berth";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface GetBerthProps {
    id: string;
}

export const getBerth = createAsyncThunk<
    Berth,
    GetBerthProps,
    ThunkConfig<string>
>("getBerth", async ({ id }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Berth>(`/berthes/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Должность не найдена!");
    }
});
