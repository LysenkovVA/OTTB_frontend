import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Department } from "@/entities/Department";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface GetDepartmentProps {
    id: string;
}

export const getDepartment = createAsyncThunk<
    Department,
    GetDepartmentProps,
    ThunkConfig<string>
>("department/getDepartment", async ({ id }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        if (!id) {
            return rejectWithValue(
                "Идентификатор подразделения не задан! (getDepartment)",
            );
        }
        const response = await extra.api.get<Department>(`/departments/${id}`);

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

        return rejectWithValue("Подразделение не найдено!");
    }
});
