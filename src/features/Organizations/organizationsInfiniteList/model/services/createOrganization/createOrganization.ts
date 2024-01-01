import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Organization } from "@/entities/Organization";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateOrganizationProps {
    data: Organization;
    workspaceId: string;
}

export const createOrganization = createAsyncThunk<
    Organization,
    CreateOrganizationProps,
    ThunkConfig<string>
>("organization/createCertificate", async ({ data, workspaceId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<Organization>(
            "/organizations/create",
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

        return rejectWithValue("Произошла ошибка при создании организации!");
    }
});
