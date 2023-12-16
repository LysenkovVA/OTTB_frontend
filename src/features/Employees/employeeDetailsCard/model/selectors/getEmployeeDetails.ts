import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getEmployeeDetailsSchema = (state: StateSchema) => {
    return state.employeeDetailsSchema;
};

export const getEmployeeDetails = createSelector(
    getEmployeeDetailsSchema,
    (schema) => {
        return schema?.employeeDetails ?? undefined;
    },
);

export const getEmployeeDetailsForm = createSelector(
    getEmployeeDetailsSchema,
    (schema) => {
        return schema?.employeeDetailsForm ?? undefined;
    },
);

export const getEmployeeDetailsIsDataLoading = createSelector(
    getEmployeeDetailsSchema,
    (schema) => {
        return schema?.isDataLoading ?? false;
    },
);

export const getEmployeeDetailsDataError = createSelector(
    getEmployeeDetailsSchema,
    (schema) => {
        return schema?.dataError ?? "";
    },
);

export const getEmployeeDetailsIsInitialized = createSelector(
    getEmployeeDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);

export const getEmployeeDetailsFormAvatar = createSelector(
    getEmployeeDetailsSchema,
    (schema) => {
        return schema?.employeeDetailsFormAvatar ?? undefined;
    },
);

export const getEmployeeDetailsAvatarIsUploading = createSelector(
    getEmployeeDetailsSchema,
    (schema) => {
        return schema?.isAvatarUploading ?? false;
    },
);

export const getEmployeeDetailsAvatarUploadError = createSelector(
    getEmployeeDetailsSchema,
    (schema) => {
        return schema?.avatarUploadError ?? "";
    },
);

export const getEmployeeDetailsRemoveAvatarOnUpdate = createSelector(
    getEmployeeDetailsSchema,
    (schema) => {
        return schema?.removeAvatarOnUpdate ?? false;
    },
);