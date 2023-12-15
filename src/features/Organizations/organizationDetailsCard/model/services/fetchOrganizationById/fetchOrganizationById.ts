import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Organization } from "@/entities/Organization";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface FetchOrganizationByIdProps {
    organizationId: string | undefined;
}

export const fetchOrganizationById = createAsyncThunk<
    Organization,
    FetchOrganizationByIdProps,
    ThunkConfig<string>
>(
    "organizations/fetchOrganizationById",
    async ({ organizationId }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Organization>(
                `/organizations/${organizationId}`,
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
            return rejectWithValue("Ошибка при получении данных организации!");
        }
    },
);
