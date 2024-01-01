import { ThunkConfig } from "@/app/providers/StoreProvider";
import { CertificateType } from "@/entities/CertificateType";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { types } from "sass";
import Number = types.Number;

export interface CreateCertificateTypeProps {
    data: CertificateType;
    workspaceId: string | undefined;
    // organizationId: string | undefined;
}

export const createCertificateType = createAsyncThunk<
    CertificateType,
    CreateCertificateTypeProps,
    ThunkConfig<string>
>("createCertificateType", async ({ data, workspaceId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!workspaceId) {
        return rejectWithValue("Рабочее пространство неизвестно!");
    }

    // if (!organizationId) {
    //     return rejectWithValue("Организация не задана!");
    // }

    try {
        const response = await extra.api.post<CertificateType>(
            "/certificate-types/create",
            { ...data, id: undefined },
            {
                params: {
                    workspaceId,
                    // organizationId,
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

        return rejectWithValue(
            "Произошла ошибка при создании типа удостоверения!",
        );
    }
});
