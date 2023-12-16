import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getOrganizationDetailsSchema = (state: StateSchema) => {
    return state.organizationDetailsSchema;
};

export const getOrganizationDetailsIsLoading = createSelector(
    getOrganizationDetailsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getOrganizationDetailsError = createSelector(
    getOrganizationDetailsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getOrganizationDetails = createSelector(
    getOrganizationDetailsSchema,
    (schema) => {
        return schema?.organizationDetails ?? undefined;
    },
);

export const getOrganizationDetailsForm = createSelector(
    getOrganizationDetailsSchema,
    (schema) => {
        return schema?.organizationDetailsForm ?? undefined;
    },
);

export const getOrganizationDetailsIsInitialized = createSelector(
    getOrganizationDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
