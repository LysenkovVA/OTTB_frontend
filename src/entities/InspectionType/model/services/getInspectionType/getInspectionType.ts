import { ThunkConfig } from "@/app/providers/StoreProvider";
import { InspectionType } from "@/entities/InspectionType";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface GetInspectionTypeProps {
    id: string;
}

export const getInspectionType = createAsyncThunk<
    InspectionType,
    GetInspectionTypeProps,
    ThunkConfig<string>
>("getInspectionType", async ({ id }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<InspectionType>(
            `/inspection-types/${id}`,
        );
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Тип проверки не найден!");
    }
});
