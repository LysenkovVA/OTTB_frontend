import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile/model/types/Profile";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosHeaders } from "axios";

export interface UpdateProfileDataProps {
    id: string;
    data: Profile;
    file?: Blob;
}

export const updateProfileData = createAsyncThunk<
    Profile,
    UpdateProfileDataProps,
    ThunkConfig<string>
>("profile/updateProfileData", async ({ id, data, file }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const formData = new FormData();

        // Данные
        if (data) {
            Object.keys(data).forEach((key) => {
                // @ts-ignore
                if (data[key]) {
                    // @ts-ignore
                    formData.append(key, data[key]);
                }
            });
        }

        // Аватар
        if (file) {
            formData.append("avatar", file, "avatar");
        }

        const headers = new AxiosHeaders();
        headers.setContentType("multipart/form-data");

        const response = await extra.api.patch<Profile>(
            `/profiles/${id}`,
            formData,
            {
                headers,
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

        return rejectWithValue(
            "Произошла ошибка при обновлении данных профиля!",
        );
    }
});
