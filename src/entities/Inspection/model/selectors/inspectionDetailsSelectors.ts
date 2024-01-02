import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getInspectionDetailsSchema = (state: StateSchema) => {
    return state.inspectionDetailsSchema;
};

export const getInspectionDetailsIsLoading = createSelector(
    getInspectionDetailsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getInspectionDetailsError = createSelector(
    getInspectionDetailsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getInspectionDetails = createSelector(
    getInspectionDetailsSchema,
    (schema) => {
        return schema?.inspectionDetails ?? undefined;
    },
);

export const getInspectionDetailsForm = createSelector(
    getInspectionDetailsSchema,
    (schema) => {
        return schema?.inspectionDetailsForm ?? undefined;
    },
);

export const getInspectionDetailsIsInitialized = createSelector(
    getInspectionDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
