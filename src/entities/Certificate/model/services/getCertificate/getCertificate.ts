import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Certificate } from "@/entities/Certificate";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface GetCertificateProps {
    id: string;
}

export const getCertificate = createAsyncThunk<
    Certificate,
    GetCertificateProps,
    ThunkConfig<string>
>("getCertificate", async ({ id }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Certificate>(
            `/certificates/${id}`,
        );
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Удостоверение не найдено!");
    }
});
