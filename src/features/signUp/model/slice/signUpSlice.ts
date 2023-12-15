import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { signUpByEmail } from "../services/signUpByEmail/signUpByEmail";
import { SignUpSchema } from "../types/SignUpSchema";

const initialState: SignUpSchema = {
    email: "",
    password: "",
    repeatedPassword: "",
    isLoading: false,
    error: undefined,
};

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setRepeatedPassword: (state, action: PayloadAction<string>) => {
            state.repeatedPassword = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signUpByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(signUpByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: signUpActions } = signUpSlice;
export const { reducer: signUpReducer } = signUpSlice;
