import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { constructionObjectsListAdapter } from "../adapter/constructionObjectsListAdapter";

const getConstructionObjectsSelectorSchema = (state: StateSchema) => {
    return state.constructionObjectSelectorSchema;
};

export const getConstructionObjects =
    constructionObjectsListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.constructionObjectSelectorSchema ??
            constructionObjectsListAdapter.getInitialState(),
    );

export const getConstructionObjectsIsLoading = createSelector(
    getConstructionObjectsSelectorSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getConstructionObjectsError = createSelector(
    getConstructionObjectsSelectorSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getConstructionObjectsIsInitialized = createSelector(
    getConstructionObjectsSelectorSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
