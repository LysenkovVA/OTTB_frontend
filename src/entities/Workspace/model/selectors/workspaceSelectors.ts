import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getWorkspaceDetailsSchema = (state: StateSchema) => {
    return state.workspaceDetailsSchema;
};

export const getWorkspaceDetails = createSelector(
    getWorkspaceDetailsSchema,
    (schema) => {
        return schema?.workspaceDetails ?? undefined;
    },
);

export const getWorkspaceDetailsForm = createSelector(
    getWorkspaceDetailsSchema,
    (schema) => {
        return schema?.workspaceDetailsForm ?? undefined;
    },
);

export const getWorkspaceDetailsIsLoading = createSelector(
    getWorkspaceDetailsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getWorkspaceDetailsError = createSelector(
    getWorkspaceDetailsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getWorkspaceDetailsIsInitialized = createSelector(
    getWorkspaceDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
