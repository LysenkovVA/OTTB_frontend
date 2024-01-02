import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface DeleteProfileAvatarProps {
    profileId: string;
}

export const deleteProfileAvatar = createAsyncThunk<
    void,
    DeleteProfileAvatarProps,
    ThunkConfig<string>
>("deleteProfileAvatar", async ({ profileId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post(
            `/profiles/delete/avatar/${profileId}`,
        );

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Произошла ошибка при удалении аватара!");
    }
});
