import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getInspectionTypeDetailsSchema = (state: StateSchema) => {
    return state.inspectionTypeDetailsSchema;
};

export const getInspectionTypeDetails = createSelector(
    getInspectionTypeDetailsSchema,
    (schema) => {
        return schema?.inspectionTypeDetails ?? undefined;
    },
);

export const getInspectionTypeDetailsForm = createSelector(
    getInspectionTypeDetailsSchema,
    (schema) => {
        return schema?.inspectionTypeDetailsForm ?? undefined;
    },
);

export const getInspectionTypeDetailsIsLoading = createSelector(
    getInspectionTypeDetailsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getInspectionTypeDetailsError = createSelector(
    getInspectionTypeDetailsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getInspectionTypeDetailsIsInitialized = createSelector(
    getInspectionTypeDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
