import { ThunkConfig } from "@/app/providers/StoreProvider";
import { InspectionType } from "@/entities/InspectionType";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateInspectionTypeProps {
    id: string;
    data: InspectionType;
}

export const updateInspectionType = createAsyncThunk<
    InspectionType,
    UpdateInspectionTypeProps,
    ThunkConfig<string>
>("updateInspectionType", async ({ id, data }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<InspectionType>(
            `/inspection-types/${id}`,
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

        return rejectWithValue(
            "Произошла ошибка при обновлении типа проверки!",
        );
    }
});
