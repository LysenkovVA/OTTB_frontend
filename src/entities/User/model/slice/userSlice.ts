import { Profile, updateProfileData } from "@/entities/Profile";
import { deleteProfileAvatar } from "@/entities/Profile/model/services/deleteProfileAvatar/deleteProfileAvatar";
import { updateProfileAvatar } from "@/entities/Profile/model/services/updateProfileAvatar/updateProfileAvatar";
import { initAuthData } from "@/entities/User/model/services/initAuthData/initAuthData";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { UserSchema } from "../types/UserSchema";

const initialState: UserSchema = {
    authenticatedUser: {},
    activeWorkspaceId: "",
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
            state.activeWorkspaceId = action.payload.workspaces?.[0].id;
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
                    state.activeWorkspaceId = action.payload.workspaces?.[0].id;
                    state._isInitialized = true;
                },
            )
            .addCase(initAuthData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state._isInitialized = true;
            })
            // При обновлении профиля, обновляем данные пользователя
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    if (state.authenticatedUser) {
                        state.authenticatedUser.profile = action.payload;
                    }
                },
            )
            .addCase(updateProfileAvatar.fulfilled, (state, action) => {
                const avatar = action.payload;

                if (state?.authenticatedUser?.profile && avatar) {
                    state.authenticatedUser.profile.avatar = action.payload;
                }
            })
            .addCase(deleteProfileAvatar.fulfilled, (state, action) => {
                if (state?.authenticatedUser?.profile) {
                    state.authenticatedUser.profile.avatar = undefined;
                }
            });
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
