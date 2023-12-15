import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

export const getProfileData = createSelector(
    (state: StateSchema) => state?.profileSchema?.profileData ?? {},
    (data) => data,
);

export const getProfileFormData = createSelector(
    (state: StateSchema) => state?.profileSchema?.profileFormData ?? {},
    (data) => data,
);

export const getProfileDataIsLoading = (state: StateSchema) =>
    state?.profileSchema?.isDataLoading ?? false;

export const getProfileDataError = (state: StateSchema) =>
    state?.profileSchema?.dataError ?? "";

export const getProfileFormDataAvatar = (state: StateSchema) =>
    state?.profileSchema?.profileFormDataAvatar ?? "";

export const getProfileAvatarIsUploading = (state: StateSchema) =>
    state?.profileSchema?.isAvatarUploading ?? false;

export const getProfileAvatarUploadError = (state: StateSchema) =>
    state?.profileSchema?.avatarUploadError ?? "";

export const getProfileDataInitialized = (state: StateSchema) =>
    state?.profileSchema?._isDataInitialized ?? false;

export const getProfileDataFormDataRemoveAvatarOnUpdate = (
    state: StateSchema,
) => state?.profileSchema?.removeAvatarOnUpdate ?? false;
