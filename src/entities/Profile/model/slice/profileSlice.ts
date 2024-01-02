import { Profile } from "@/entities/Profile";
import { deleteProfileAvatar } from "@/entities/Profile/model/services/deleteProfileAvatar/deleteProfileAvatar";
import { updateProfileAvatar } from "@/entities/Profile/model/services/updateProfileAvatar/updateProfileAvatar";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { ProfileSchema } from "../types/ProfileSchema";

const initialState: ProfileSchema = {
    isDataLoading: false,
    dataError: "",
    profileData: {},
    profileFormData: {},
    profileFormDataAvatar: undefined,
    _isDataInitialized: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Profile>) => {
            state.profileFormData = action.payload;
            state.dataChanged = true;
        },
        // Используется когда в форме выбирается файл на диске
        setProfileFormDataAvatar: (
            state,
            action: PayloadAction<string | undefined>,
        ) => {
            state.profileFormDataAvatar = action.payload;
            state.avatarChanged = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state, action) => {
                state.dataError = undefined;
                state.isDataLoading = true;
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.profileData = action.payload;
                    state.profileFormData = action.payload;
                    state._isDataInitialized = true;
                },
            )
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(updateProfileData.pending, (state, action) => {
                state.dataError = undefined;
                state.isDataLoading = true;
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.profileData = action.payload;
                    state.profileFormData = action.payload;
                    state.dataChanged = false;
                },
            )
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(updateProfileAvatar.fulfilled, (state, action) => {
                const avatar = action.payload;

                if (state.profileData && state.profileFormData && avatar) {
                    state.profileData.avatar = avatar;
                    state.profileFormData.avatar = avatar;
                    state.profileFormDataAvatar = undefined;
                    state.avatarChanged = false;
                }
            })
            .addCase(deleteProfileAvatar.fulfilled, (state, action) => {
                if (state.profileData && state.profileFormData) {
                    state.profileData.avatar = undefined;
                    state.profileFormData.avatar = undefined;
                    state.profileFormDataAvatar = undefined;
                }
            });
    },
});

export const { actions: profileActions, reducer: profileReducer } =
    profileSlice;
