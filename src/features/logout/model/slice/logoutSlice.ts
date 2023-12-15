import { createSlice } from "@reduxjs/toolkit";

import { authLogout } from "@/features/logout/model/services/logout/authLogout";
import { LogoutSchema } from "@/features/logout/model/types/LogoutSchema";

const initialState: LogoutSchema = {
    isLoading: false,
    error: undefined,
};

export const logoutSlice = createSlice({
    name: "logout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authLogout.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(authLogout.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(authLogout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: logoutActions } = logoutSlice;
export const { reducer: logoutReducer } = logoutSlice;
