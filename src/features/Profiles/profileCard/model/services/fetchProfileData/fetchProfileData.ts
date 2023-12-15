import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface FetchProfileDataProps {
    profileId: string | undefined;
}

export const fetchProfileData = createAsyncThunk<
    Profile,
    FetchProfileDataProps,
    ThunkConfig<string>
>("profile/fetchProfileData", async ({ profileId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // TODO
        const response = await extra.api.get<Profile>(`/profiles/${profileId}`);

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
        return rejectWithValue("Ошибка при получении данных профиля!");
    }
});
