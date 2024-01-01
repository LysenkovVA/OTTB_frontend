import { ThunkConfig } from "@/app/providers/StoreProvider";
import { CertificateType } from "@/entities/CertificateType";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface GetCertificateTypeProps {
    id: string;
}

export const getCertificateType = createAsyncThunk<
    CertificateType,
    GetCertificateTypeProps,
    ThunkConfig<string>
>("getCertificateType", async ({ id }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<CertificateType>(
            `/certificate-types/${id}`,
        );
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Тип удостоверения не найден!");
    }
});
