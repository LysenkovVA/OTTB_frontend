import { initAuthData } from "@/entities/User/model/services/initAuthData/initAuthData";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { UserSchema } from "../types/UserSchema";

const initialState: UserSchema = {
    authenticatedUser: {},
    registeredUserId: undefined,
    isLoading: false,
    error: "",
    _isInitialized: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authenticatedUser = action.payload;
        },
        logout: (state) => {
            state.authenticatedUser = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
        setRegisteredData: (state, action: PayloadAction<string>) => {
            state.registeredUserId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initAuthData.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                initAuthData.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.authenticatedUser = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(initAuthData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state._isInitialized = true;
            });
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
