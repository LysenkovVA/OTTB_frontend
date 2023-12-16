import { ThunkConfig } from "@/app/providers/StoreProvider";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { ISignUp } from "@/features/signUp/model/types/ISignUp";
import { $publicApi } from "@/shared/api/axios";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface SignUpByEmailProps {
    email: string;
    password: string;
}

export const signUpByEmail = createAsyncThunk<
    ISignUp,
    SignUpByEmailProps,
    ThunkConfig<string>
>("signUp/signUpByEmail", async (signUpData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await $publicApi.post<ISignUp>(
            "/auth/register",
            signUpData,
        );

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        // // Записываем токен
        // localStorage.setItem(
        //     USER_LOCALSTORAGE_KEY,
        //     JSON.stringify({
        //         user: response.data.user,
        //         accessToken: response.data.accessToken,
        //     }),
        // );

        // Добавляем в стейт данные об авторизованном пользователе
        dispatch(userActions.setRegisteredData(String(response.data.user.id)));

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue(JSON.stringify(e));
    }
});
