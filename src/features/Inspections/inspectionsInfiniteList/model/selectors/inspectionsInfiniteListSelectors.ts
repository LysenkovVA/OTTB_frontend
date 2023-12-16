import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { inspectionsInfiniteListAdapter } from "../adapter/inspectionsInfiniteListAdapter";

const getInspectionsInfiniteListSchema = (state: StateSchema) => {
    return state.inspectionsInfiniteListSchema;
};

export const getInspectionsInfiniteList =
    inspectionsInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.inspectionsInfiniteListSchema ??
            inspectionsInfiniteListAdapter.getInitialState(),
    );

export const getInspectionsInfiniteListIsLoading = createSelector(
    getInspectionsInfiniteListSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getInspectionsInfiniteListError = createSelector(
    getInspectionsInfiniteListSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getInspectionsInfiniteListLimit = createSelector(
    getInspectionsInfiniteListSchema,
    (schema) => {
        return schema?.limit ?? 10;
    },
);

export const getInspectionInfiniteListOffset = createSelector(
    getInspectionsInfiniteListSchema,
    (schema) => {
        return schema?.offset ?? 0;
    },
);

export const getInspectionsInfiniteListHasMore = createSelector(
    getInspectionsInfiniteListSchema,
    (schema) => {
        return schema?.hasMore ?? false;
    },
);

export const getInspectionsInfiniteListIsInitialized = createSelector(
    getInspectionsInfiniteListSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
