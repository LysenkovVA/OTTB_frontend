import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Inspection } from "@/entities/Inspection";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateInspectionProps {
    id: string;
    data: Inspection;
}

export const updateInspection = createAsyncThunk<
    Inspection,
    UpdateInspectionProps,
    ThunkConfig<string>
>("updateInspection", async ({ id, data }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<Inspection>(
            `/inspections/${id}`,
            data,
        );

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Произошла ошибка при обновлении проверки!");
    }
});
