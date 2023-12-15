import { Profile } from "@/entities/Profile";
import { removeProfileAvatar } from "@/features/Profiles/profileCard/model/services/removeProfileAvatar/removeProfileAvatar";
import { updateProfileAvatar } from "@/features/Profiles/profileCard/model/services/updateProfileAvatar/updateProfileAvatar";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { ProfileSchema } from "../types/ProfileSchema";

const initialState: ProfileSchema = {
    isDataLoading: false,
    dataError: "",
    profileData: {},
    profileFormData: {},
    isAvatarUploading: false,
    avatarUploadError: "",
    profileFormDataAvatar: undefined,
    _isDataInitialized: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfileFormData: (state, action: PayloadAction<Profile>) => {
            state.profileFormData = action.payload;
        },
        // Используется когда в форме выбирается файл на диске
        setProfileFormDataAvatar: (state, action: PayloadAction<string>) => {
            state.profileFormDataAvatar = action.payload;
        },
        setRemoveAvatarOnUpdate: (state, action: PayloadAction<boolean>) => {
            state.removeAvatarOnUpdate = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state, action) => {
                state.dataError = undefined;
                state.isDataLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.isDataLoading = false;
                state.dataError = undefined;
                state.profileData = action.payload;
                state.profileFormData = action.payload;
                state._isDataInitialized = true;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(updateProfileData.pending, (state, action) => {
                state.dataError = undefined;
                state.isDataLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action) => {
                state.isDataLoading = false;
                state.dataError = undefined;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(updateProfileAvatar.pending, (state, action) => {
                state.avatarUploadError = undefined;
                state.isAvatarUploading = true;
            })
            .addCase(updateProfileAvatar.fulfilled, (state, action) => {
                state.isAvatarUploading = false;
                state.avatarUploadError = undefined;
            })
            .addCase(updateProfileAvatar.rejected, (state, action) => {
                state.isAvatarUploading = false;
                state.avatarUploadError = action.payload;
            })
            .addCase(removeProfileAvatar.pending, (state, action) => {
                state.avatarUploadError = undefined;
                state.isAvatarUploading = true;
            })
            .addCase(removeProfileAvatar.fulfilled, (state, action) => {
                state.isAvatarUploading = false;
                state.avatarUploadError = undefined;
                state.removeAvatarOnUpdate = false;
            })
            .addCase(removeProfileAvatar.rejected, (state, action) => {
                state.isAvatarUploading = false;
                state.avatarUploadError = action.payload;
            });
    },
});

export const { actions: profileActions, reducer: profileReducer } =
    profileSlice;
