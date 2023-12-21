import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Berth } from "@/entities/Berth";
import { employeesInfiniteListActions } from "@/features/Employees/employeesInfiniteList/model/slice/employeesInfiniteListSlice";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateBerthProps {
    berth: Berth;
}

export const updateBerth = createAsyncThunk<
    Berth,
    UpdateBerthProps,
    ThunkConfig<string>
>("berthes/updateBerth", async ({ berth }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<Berth>(
            `/berthes/${berth.id}`,
            berth,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        dispatch(employeesInfiniteListActions.setOne(response.data));

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Произошла ошибка при обновлении должности!");
    }
});
