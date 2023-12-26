import { StateSchema } from "@/app/providers/StoreProvider";
import { berthTypesListAdapter } from "@/features/BerthTypes/berthTypeSelector/model/adapter/berthTypesListAdapter";
import { createSelector } from "@reduxjs/toolkit";

const getBerthTypesListSchema = (state: StateSchema) => {
    return state.berthTypesListSchema;
};

export const getBerthTypesListSelectors =
    berthTypesListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.berthTypesListSchema ??
            berthTypesListAdapter.getInitialState(),
    );

export const getBerthTypesListIsLoading = createSelector(
    getBerthTypesListSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getBerthTypesListError = createSelector(
    getBerthTypesListSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getBerthTypesListIsInitialized = createSelector(
    getBerthTypesListSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
