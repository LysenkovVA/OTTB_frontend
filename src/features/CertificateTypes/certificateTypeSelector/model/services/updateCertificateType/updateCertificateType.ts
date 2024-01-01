import { ThunkConfig } from "@/app/providers/StoreProvider";
import { CertificateType } from "@/entities/CertificateType";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateCertificateTypeProps {
    id: string;
    data: CertificateType;
}

export const updateCertificateType = createAsyncThunk<
    CertificateType,
    UpdateCertificateTypeProps,
    ThunkConfig<string>
>("updateCertificateType", async ({ id, data }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<CertificateType>(
            `/certificate-types/${id}`,
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
            "Произошла ошибка при обновлении типа удостоверения!",
        );
    }
});
