import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile/model/types/Profile";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateProfileDataProps {
    id: string;
    data: Profile;
}

export const updateProfileData = createAsyncThunk<
    Profile,
    UpdateProfileDataProps,
    ThunkConfig<string>
>("updateProfileData", async ({ id, data }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.patch<Profile>(`/profiles/${id}`, {
            ...data,
            id: undefined,
        });

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue(
            "Произошла ошибка при обновлении данных профиля!",
        );
    }
});
