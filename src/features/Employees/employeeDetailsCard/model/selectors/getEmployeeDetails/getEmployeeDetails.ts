import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeeDetails = (state: StateSchema) =>
    state.employeeDetailsSchema?.employeeDetails ?? undefined;

export const getEmployeeDetailsForm = (state: StateSchema) =>
    state.employeeDetailsSchema?.employeeDetailsForm ?? undefined;

export const getEmployeeDetailsIsDataLoading = (state: StateSchema) =>
    state.employeeDetailsSchema?.isDataLoading ?? false;

export const getEmployeeDetailsDataError = (state: StateSchema) =>
    state.employeeDetailsSchema?.dataError ?? "";

export const getEmployeeDetailsIsInitialized = (state: StateSchema) =>
    state.employeeDetailsSchema?._isInitialized ?? false;

export const getEmployeeDetailsFormAvatar = (state: StateSchema) =>
    state.employeeDetailsSchema?.employeeDetailsFormAvatar ?? undefined;

export const getEmployeeDetailsAvatarIsUploading = (state: StateSchema) =>
    state.employeeDetailsSchema?.isAvatarUploading ?? false;

export const getEmployeeDetailsAvatarUploadError = (state: StateSchema) =>
    state.employeeDetailsSchema?.avatarUploadError ?? "";

export const getEmployeeDetailsRemoveAvatarOnUpdate = (state: StateSchema) =>
    state?.employeeDetailsSchema?.removeAvatarOnUpdate ?? false;
