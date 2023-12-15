import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Organization } from "@/entities/Organization";
import { organizationsInfiniteListActions } from "@/features/Organizations/organizationsInfiniteList/model/slice/organizationsInfiniteListSlice";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateOrganizationProps {
    organization: Organization;
}

/**
 * Обновление данных организации
 * Возвращает: обновленные данные организации
 */
export const updateOrganization = createAsyncThunk<
    Organization,
    UpdateOrganizationProps,
    ThunkConfig<string>
>("profile/updateOrganization", async ({ organization }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.patch<Organization>(
            `/organizations/${organization.id}`,
            organization,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        dispatch(organizationsInfiniteListActions.setOne(response.data));

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
