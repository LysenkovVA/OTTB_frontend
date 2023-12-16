import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { constructionObjectsInfiniteListAdapter } from "../adapter/constructionObjectsInfiniteListAdapter";

const getConstructionObjectsInfiniteListSchema = (state: StateSchema) => {
    return state.constructionObjectsInfiniteListSchema;
};

export const getConstructionObjectsInfiniteList =
    constructionObjectsInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.constructionObjectsInfiniteListSchema ??
            constructionObjectsInfiniteListAdapter.getInitialState(),
    );

export const getConstructionObjectsInfiniteListIsLoading = createSelector(
    getConstructionObjectsInfiniteListSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getConstructionObjectsInfiniteListError = createSelector(
    getConstructionObjectsInfiniteListSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getConstructionObjectsInfiniteListLimit = createSelector(
    getConstructionObjectsInfiniteListSchema,
    (schema) => {
        return schema?.limit ?? 10;
    },
);

export const getConstructionObjectsInfiniteListOffset = createSelector(
    getConstructionObjectsInfiniteListSchema,
    (schema) => {
        return schema?.offset ?? 0;
    },
);

export const getConstructionObjectsInfiniteListHasMore = createSelector(
    getConstructionObjectsInfiniteListSchema,
    (schema) => {
        return schema?.hasMore ?? false;
    },
);

export const getConstructionObjectsInfiniteListIsInitialized = createSelector(
    getConstructionObjectsInfiniteListSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
