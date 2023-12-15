import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Organization } from "@/entities/Organization";
import { organizationsInfiniteListActions } from "@/features/Organizations/organizationsInfiniteList/model/slice/organizationsInfiniteListSlice";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateOrganizationProps {
    organization: Organization;
}

export const createOrganization = createAsyncThunk<
    Organization,
    CreateOrganizationProps,
    ThunkConfig<string>
>("profile/createOrganization", async ({ organization }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.post<Organization>(
            "/organizations/create",
            { ...organization, id: undefined },
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        dispatch(organizationsInfiniteListActions.addOne(response.data));

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
