import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authByEmail } from "../services/authByEmail/authByEmail";
import { AuthSchema } from "../types/AuthSchema";

const initialState: AuthSchema = {
    email: "",
    password: "",
    isLoading: false,
    error: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authByEmail.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(authByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(authByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
