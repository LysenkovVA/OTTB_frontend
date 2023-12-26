import { ThunkConfig } from "@/app/providers/StoreProvider";
import { File } from "@/entities/File";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosHeaders } from "axios";

export interface UpdateEmployeeAvatarProps {
    employeeId: string;
    file?: Blob;
}

export const updateEmployeeAvatar = createAsyncThunk<
    File,
    UpdateEmployeeAvatarProps,
    ThunkConfig<string>
>("updateEmployeeAvatar", async ({ employeeId, file }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const formData = new FormData();
        if (file) {
            formData.append("avatar", file, "avatar");
        }
        const headers = new AxiosHeaders();
        headers.setContentType("multipart/form-data");

        const response = await extra.api.post<File>(
            `/employees/upload/avatar/${employeeId}`,
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

        return rejectWithValue("Произошла ошибка при обновлении аватара!");
    }
});
