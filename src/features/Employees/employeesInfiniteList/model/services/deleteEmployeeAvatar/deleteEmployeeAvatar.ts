import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface DeleteEmployeeAvatarProps {
    employeeId: string;
}

export const deleteEmployeeAvatar = createAsyncThunk<
    void,
    DeleteEmployeeAvatarProps,
    ThunkConfig<string>
>("deleteEmployeeAvatar", async ({ employeeId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post(
            `/employees/delete/avatar/${employeeId}`,
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
