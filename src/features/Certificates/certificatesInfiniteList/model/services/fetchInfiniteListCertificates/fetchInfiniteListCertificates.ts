import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Certificate } from "@/entities/Certificate";
import {
    getCertificatesInfiniteListLimit,
    getCertificatesInfiniteListOffset,
} from "@/features/Certificates/certificatesInfiniteList/model/selectors/certificatesInfiniteListSelectors";
import { ServerError } from "@/shared/error/ServerError";
import { FetchRowsResult } from "@/shared/types/FetchRowsResult";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface FetchInfiniteListCertificatesProps {
    workspaceId: string;
    replaceData?: boolean; // Для использования в action.meta.arg
}

export const fetchInfiniteListCertificates = createAsyncThunk<
    FetchRowsResult<Certificate>,
    FetchInfiniteListCertificatesProps,
    ThunkConfig<string>
>("certificates/fetchInfiniteListCertificates", async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const { workspaceId } = props;

    if (!workspaceId) {
        return rejectWithValue("Рабочее пространство неизвестно!");
    }

    // Получаем параметры из стейта
    const limit = getCertificatesInfiniteListLimit(getState());
    const offset = getCertificatesInfiniteListOffset(getState());

    try {
        // Отправляем запрос
        const response = await extra.api.get<FetchRowsResult<Certificate>>(
            "/certificates",
            {
                params: {
                    workspaceId,
                    limit,
                    offset,
                },
            },
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Ошибка при получении списка организаций");
    }
});
