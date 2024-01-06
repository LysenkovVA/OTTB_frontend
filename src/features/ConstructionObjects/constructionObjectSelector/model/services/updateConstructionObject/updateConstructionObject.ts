import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ConstructionObject } from "@/entities/ConstructionObject";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateConstructionObjectProps {
    id: string;
    data: ConstructionObject;
}

export const updateConstructionObject = createAsyncThunk<
    ConstructionObject,
    UpdateConstructionObjectProps,
    ThunkConfig<string>
>("updateConstructionObject", async ({ id, data }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<ConstructionObject>(
            `/construction-objects/${id}`,
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

        return rejectWithValue("Произошла ошибка при обновлении объекта!");
    }
});
