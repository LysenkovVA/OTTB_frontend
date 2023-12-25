import { ThunkConfig } from "@/app/providers/StoreProvider";

import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface RemoveOrganizationProps {
    organizationId: string;
}

export const removeOrganization = createAsyncThunk<
    void,
    RemoveOrganizationProps,
    ThunkConfig<string>
>("organizations/removeOrganization", async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // Отправляем запрос
        const response = await extra.api.delete(
            `/organizations/${props.organizationId}`,
        );

        return undefined;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }
        return rejectWithValue("Ошибка при удалении организации");
    }
});
