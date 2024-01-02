import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Inspection } from "@/entities/Inspection";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateInspectionProps {
    data: Inspection;
    workspaceId: string;
}

export const createInspection = createAsyncThunk<
    Inspection,
    CreateInspectionProps,
    ThunkConfig<string>
>("createInspection", async ({ data, workspaceId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<Inspection>(
            "/inspections/create",
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

        return rejectWithValue("Произошла ошибка при создании проверки!");
    }
});
