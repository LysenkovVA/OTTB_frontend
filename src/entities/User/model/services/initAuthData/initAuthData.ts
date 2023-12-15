import { ThunkConfig } from "@/app/providers/StoreProvider";
import { User } from "@/entities/User";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    "user/initAuthData",
    async (_, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi;

        try {
            // Достаем из локалсторадж поле user
            const data = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (data) {
                // Если нашли такое поле, у него есть id и email
                const id = JSON.parse(data).user?.id;

                if (id) {
                    const response = await extra.api.get<User>(`/users/${id}`);
                    return response.data;
                }
            }

            return rejectWithValue("Нет данных в localstorage");
        } catch (e) {
            if (e instanceof AxiosError) {
                const serverError = e?.response?.data as ServerError;

                if (serverError) {
                    return rejectWithValue(serverError.error);
                }
            }
            return rejectWithValue("Неверный логин или пароль!");
        }
    },
);
