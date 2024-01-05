import { StateSchema } from "@/app/providers/StoreProvider";
import { inspectionTypesSelectorAdapter } from "@/features/InspectionTypes/inspectionTypeSelector/model/adapter/inspectionTypesSelectorAdapter";
import { createSelector } from "@reduxjs/toolkit";

const getInspectionTypesSelectorSchema = (state: StateSchema) => {
    return state.inspectionTypeSelectorSchema;
};

export const getInspectionTypesListSelectors =
    inspectionTypesSelectorAdapter.getSelectors<StateSchema>(
        (state) =>
            state.inspectionTypeSelectorSchema ??
            inspectionTypesSelectorAdapter.getInitialState(),
    );

export const getInspectionTypesListIsLoading = createSelector(
    getInspectionTypesSelectorSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getInspectionTypesListError = createSelector(
    getInspectionTypesSelectorSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getInspectionTypesListIsInitialized = createSelector(
    getInspectionTypesSelectorSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
