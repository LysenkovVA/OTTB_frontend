import { initAuthData } from "@/entities/User/model/services/initAuthData/initAuthData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { UserSchema } from "../types/UserSchema";

const initialState: UserSchema = {
    authenticatedUser: {},
    // avatar: undefined,
    registeredUserId: undefined,
    isLoading: false,
    error: "",
    // isAvatarLoading: false,
    // avatarError: "",
    _isInitialized: false,
    // _isAvatarInitialized: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authenticatedUser = action.payload;
        },
        setUserIsInitialized: (
            state,
            action: PayloadAction<boolean | undefined>,
        ) => {
            state._isInitialized = action.payload;
        },
        // setAvatarIsInitialized: (
        //     state,
        //     action: PayloadAction<boolean | undefined>,
        // ) => {
        //     state._isAvatarInitialized = action.payload;
        // },
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
            });
        // .addCase(fetchUserAvatar.pending, (state, action) => {
        //     state.avatarError = undefined;
        //     state.isAvatarLoading = true;
        // })
        // .addCase(fetchUserAvatar.fulfilled, (state, action) => {
        //     state.avatarError = undefined;
        //     state.isAvatarLoading = false;
        //     state.avatar = action.payload;
        //     state._isAvatarInitialized = true;
        // })
        // .addCase(fetchUserAvatar.rejected, (state, action) => {
        //     state.avatarError = action.payload;
        //     state.isAvatarLoading = false;
        // });
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
