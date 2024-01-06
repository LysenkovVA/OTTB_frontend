import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ConstructionObject } from "@/entities/ConstructionObject";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface GetConstructionObjectProps {
    id: string;
}

export const getConstructionObject = createAsyncThunk<
    ConstructionObject,
    GetConstructionObjectProps,
    ThunkConfig<string>
>("getConstructionObject", async ({ id }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<ConstructionObject>(
            `/construction-objects/${id}`,
        );
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Объект не найден!");
    }
});
