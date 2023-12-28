import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Department } from "@/entities/Department";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateDepartmentProps {
    id: string;
    data: Department;
}

export const updateDepartment = createAsyncThunk<
    Department,
    UpdateDepartmentProps,
    ThunkConfig<string>
>("department/updateDepartment", async ({ id, data }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<Department>(
            `/departments/${id}`,
            data,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }
        // TODO надо ли?
        // dispatch(employeesInfiniteListActions.setOne(response.data));

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue(
            "Произошла ошибка при обновлении подразделения!",
        );
    }
});
