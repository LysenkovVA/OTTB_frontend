import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getDProfileSchema = (state: StateSchema) => {
    return state.profileSchema;
};

export const getProfileData = createSelector(getDProfileSchema, (schema) => {
    return schema?.profileData ?? undefined;
});

export const getProfileFormData = createSelector(
    getDProfileSchema,
    (schema) => {
        return schema?.profileFormData ?? undefined;
    },
);

export const getProfileDataIsLoading = createSelector(
    getDProfileSchema,
    (schema) => {
        return schema?.isDataLoading ?? false;
    },
);

export const getProfileDataError = createSelector(
    getDProfileSchema,
    (schema) => {
        return schema?.dataError ?? "";
    },
);

export const getProfileFormDataAvatar = createSelector(
    getDProfileSchema,
    (schema) => {
        return schema?.profileFormDataAvatar ?? "";
    },
);

export const getProfileAvatarIsUploading = createSelector(
    getDProfileSchema,
    (schema) => {
        return schema?.isAvatarUploading ?? false;
    },
);

export const getProfileAvatarUploadError = createSelector(
    getDProfileSchema,
    (schema) => {
        return schema?.avatarUploadError ?? "";
    },
);

export const getProfileDataInitialized = createSelector(
    getDProfileSchema,
    (schema) => {
        return schema?._isDataInitialized ?? false;
    },
);

export const getProfileDataFormDataRemoveAvatarOnUpdate = createSelector(
    getDProfileSchema,
    (schema) => {
        return schema?.removeAvatarOnUpdate ?? false;
    },
);
