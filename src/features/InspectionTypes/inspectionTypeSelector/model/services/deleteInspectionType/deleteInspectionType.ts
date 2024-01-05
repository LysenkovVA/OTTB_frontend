import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface DeleteInspectionTypeProps {
    id: string;
}

export const deleteInspectionType = createAsyncThunk<
    void,
    DeleteInspectionTypeProps,
    ThunkConfig<string>
>("deleteInspectionType", async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // Отправляем запрос
        const response = await extra.api.delete(
            `/inspection-types/${props.id}`,
        );

        return undefined;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }
        return rejectWithValue("Ошибка при удалении типа проверки");
    }
});
