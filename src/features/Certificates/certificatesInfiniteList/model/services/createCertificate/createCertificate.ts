import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Certificate } from "@/entities/Certificate";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateCertificateProps {
    data: Certificate;
    workspaceId: string;
}

export const createCertificate = createAsyncThunk<
    Certificate,
    CreateCertificateProps,
    ThunkConfig<string>
>("createCertificate", async ({ data, workspaceId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<Certificate>(
            "/certificates/create",
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

        return rejectWithValue("Произошла ошибка при создании удостоверения!");
    }
});
