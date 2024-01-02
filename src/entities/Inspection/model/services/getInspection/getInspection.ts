import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Inspection } from "@/entities/Inspection";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface GetInspectionProps {
    id: string;
}

export const getInspection = createAsyncThunk<
    Inspection,
    GetInspectionProps,
    ThunkConfig<string>
>("getInspection", async ({ id }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Inspection>(`/inspections/${id}`);

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }
        return rejectWithValue("Ошибка при получении данных проверки!");
    }
});
