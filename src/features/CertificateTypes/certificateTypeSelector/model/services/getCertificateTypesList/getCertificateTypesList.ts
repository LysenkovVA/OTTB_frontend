import { ThunkConfig } from "@/app/providers/StoreProvider";
import { CertificateType } from "@/entities/CertificateType";
import { ServerError } from "@/shared/error/ServerError";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface GetCertificateTypesListProps {
    workspaceId: string | undefined;
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const getCertificateTypesList = createAsyncThunk<
    FetchRowsResult<CertificateType>,
    GetCertificateTypesListProps,
    ThunkConfig<string>
>("getCertificateTypesList", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const { workspaceId } = props;

    if (!workspaceId) {
        return rejectWithValue("Рабочее пространство неизвестно!");
    }

    try {
        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<CertificateType>>(
            "/certificate-types",
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
        return rejectWithValue(
            "Ошибка при получении списка типов удостоверений",
        );
    }
});
