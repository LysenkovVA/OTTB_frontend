import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Berth } from "@/entities/Berth";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateBerthProps {
    id: string;
    data: Berth;
}

export const updateBerth = createAsyncThunk<
    Berth,
    UpdateBerthProps,
    ThunkConfig<string>
>("berthes/updateConstructionObject", async ({ id, data }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<Berth>(`/berthes/${id}`, data);

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Произошла ошибка при обновлении должности!");
    }
});
