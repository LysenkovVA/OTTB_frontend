import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Organization } from "@/entities/Organization";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateOrganizationProps {
    id: string;
    data: Organization;
}

export const updateOrganization = createAsyncThunk<
    Organization,
    UpdateOrganizationProps,
    ThunkConfig<string>
>("organization/updateInspection", async ({ id, data }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<Organization>(
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

        return rejectWithValue("Произошла ошибка при обновлении организации!");
    }
});
