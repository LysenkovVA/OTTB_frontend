import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Organization } from "@/entities/Organization";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateOrganizationProps {
    organization: Organization;
    workspaceId: string;
}

export const createOrganization = createAsyncThunk<
    Organization,
    CreateOrganizationProps,
    ThunkConfig<string>
>(
    "organization/createOrganization",
    async ({ organization, workspaceId }, thunkApi) => {
        const { dispatch, extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await extra.api.post<Organization>(
                "/organizations/create",
                { ...organization, id: undefined },
                {
                    params: {
                        workspaceId,
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

            return rejectWithValue(
                "Произошла ошибка при создании организации!",
            );
        }
    },
);
