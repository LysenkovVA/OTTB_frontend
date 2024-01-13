import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getCheckListDetailsSchema = (state: StateSchema) => {
    return state.checkListDetailsSchema;
};

export const getCheckListDetails = createSelector(
    getCheckListDetailsSchema,
    (schema) => {
        return schema?.checkListDetails ?? undefined;
    },
);

export const getCheckListDetailsForm = createSelector(
    getCheckListDetailsSchema,
    (schema) => {
        return schema?.checkListDetailsForm ?? undefined;
    },
);

export const getCheckListDetailsIsLoading = createSelector(
    getCheckListDetailsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getCheckListDetailsIsUpdating = createSelector(
    getCheckListDetailsSchema,
    (schema) => {
        return schema?.isUpdating ?? false;
    },
);

export const getCheckListDetailsError = createSelector(
    getCheckListDetailsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getCheckListDetailsIsInitialized = createSelector(
    getCheckListDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
