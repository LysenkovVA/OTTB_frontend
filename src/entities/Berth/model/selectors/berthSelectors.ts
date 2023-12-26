import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getBerthDetailsSchema = (state: StateSchema) => {
    return state.berthDetailsSchema;
};

export const getBerthDetails = createSelector(
    getBerthDetailsSchema,
    (schema) => {
        return schema?.berthDetails ?? undefined;
    },
);

export const getBerthDetailsForm = createSelector(
    getBerthDetailsSchema,
    (schema) => {
        return schema?.berthDetailsForm ?? undefined;
    },
);

export const getBerthDetailsIsLoading = createSelector(
    getBerthDetailsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getBerthDetailsError = createSelector(
    getBerthDetailsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getBerthDetailsIsInitialized = createSelector(
    getBerthDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
