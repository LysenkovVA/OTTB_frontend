import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getBerthTypeDetailsSchema = (state: StateSchema) => {
    return state.berthTypeDetailsSchema;
};

export const getBerthTypeDetails = createSelector(
    getBerthTypeDetailsSchema,
    (schema) => {
        return schema?.berthTypeDetails ?? undefined;
    },
);

export const getBerthTypeDetailsForm = createSelector(
    getBerthTypeDetailsSchema,
    (schema) => {
        return schema?.berthTypeDetailsForm ?? undefined;
    },
);

export const getBerthTypeDetailsIsLoading = createSelector(
    getBerthTypeDetailsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getBerthTypeDetailsError = createSelector(
    getBerthTypeDetailsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getBerthTypeDetailsIsInitialized = createSelector(
    getBerthTypeDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
