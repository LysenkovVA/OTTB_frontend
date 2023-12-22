import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface DeleteDepartmentProps {
    departmentId: string;
}

export const deleteDepartment = createAsyncThunk<
    void,
    DeleteDepartmentProps,
    ThunkConfig<string>
>("departments/deleteDepartment", async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // Отправляем запрос
        const response = await extra.api.delete(
            `/departments/${props.departmentId}`,
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
        return rejectWithValue("Ошибка при удалении подразделения");
    }
});
