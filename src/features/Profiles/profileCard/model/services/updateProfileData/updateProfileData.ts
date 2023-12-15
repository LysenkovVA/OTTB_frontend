import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile/model/types/Profile";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateProfileDataProps {
    profileData: Profile;
}

export const updateProfileData = createAsyncThunk<
    boolean,
    UpdateProfileDataProps,
    ThunkConfig<string>
>("profile/updateProfileData", async ({ profileData }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.patch<boolean>(
            `/profiles/${profileData.id}`,
            profileData,
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
            "Произошла ошибка при обновлении данных профиля!",
        );
    }
});
