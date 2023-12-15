import { ThunkConfig } from "@/app/providers/StoreProvider";
import { deleteFile } from "@/entities/File/model/services/deleteFile/deleteFile";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface RemoveEmployeeAvatarProps {
    fileId: string | undefined;
}

export const removeEmployeeAvatar = createAsyncThunk<
    void,
    RemoveEmployeeAvatarProps,
    ThunkConfig<string>
>("profile/removeEmployeeAvatar", async ({ fileId }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        await dispatch(deleteFile({ fileId })).then((result) => result.payload);
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Ошибка при удалении аватара профиля!");
    }
});
