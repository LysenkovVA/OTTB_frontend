import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getConstructionObjectDetailsSchema = (state: StateSchema) => {
    return state.constructionObjectDetailsSchema;
};

export const getConstructionObjectDetails = createSelector(
    getConstructionObjectDetailsSchema,
    (schema) => {
        return schema?.constructionObjectDetails ?? undefined;
    },
);

export const getConstructionObjectDetailsForm = createSelector(
    getConstructionObjectDetailsSchema,
    (schema) => {
        return schema?.constructionObjectDetailsForm ?? undefined;
    },
);

export const getConstructionObjectDetailsIsLoading = createSelector(
    getConstructionObjectDetailsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getConstructionObjectDetailsError = createSelector(
    getConstructionObjectDetailsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getConstructionObjectDetailsIsInitialized = createSelector(
    getConstructionObjectDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
