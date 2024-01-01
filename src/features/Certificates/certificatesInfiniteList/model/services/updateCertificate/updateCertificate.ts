import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Certificate } from "@/entities/Certificate";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateCertificateProps {
    id: string;
    data: Certificate;
}

export const updateCertificate = createAsyncThunk<
    Certificate,
    UpdateCertificateProps,
    ThunkConfig<string>
>("updateCertificate", async ({ id, data }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<Certificate>(
            `/organizations/${id}`,
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
            "Произошла ошибка при обновлении удостоверения!",
        );
    }
});
