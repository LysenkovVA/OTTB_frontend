import { ThunkConfig } from "@/app/providers/StoreProvider";

import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface DeleteCertificateTypeProps {
    id: string;
}

export const deleteCertificateType = createAsyncThunk<
    void,
    DeleteCertificateTypeProps,
    ThunkConfig<string>
>("deleteCertificateType", async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // Отправляем запрос
        const response = await extra.api.delete(
            `/certificate-types/${props.id}`,
        );

        return undefined;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }
        return rejectWithValue("Ошибка при удалении типа удостоверения");
    }
});
