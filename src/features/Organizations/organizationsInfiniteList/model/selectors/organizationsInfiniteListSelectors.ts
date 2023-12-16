import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { organizationsInfiniteListAdapter } from "../adapter/organizationsInfiniteListAdapter";

const getOrganizationsInfiniteListSchema = (state: StateSchema) => {
    return state.organizationsInfiniteListSchema;
};

export const getOrganizationsInfiniteList =
    organizationsInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.organizationsInfiniteListSchema ??
            organizationsInfiniteListAdapter.getInitialState(),
    );

export const getOrganizationsInfiniteListIsLoading = createSelector(
    getOrganizationsInfiniteListSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getOrganizationsInfiniteListError = createSelector(
    getOrganizationsInfiniteListSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getOrganizationsInfiniteListLimit = createSelector(
    getOrganizationsInfiniteListSchema,
    (schema) => {
        return schema?.limit ?? 10;
    },
);

export const getOrganizationsInfiniteListOffset = createSelector(
    getOrganizationsInfiniteListSchema,
    (schema) => {
        return schema?.offset ?? 0;
    },
);

export const getOrganizationsInfiniteListHasMore = createSelector(
    getOrganizationsInfiniteListSchema,
    (schema) => {
        return schema?.hasMore ?? false;
    },
);

export const getOrganizationsInfiniteListIsInitialized = createSelector(
    getOrganizationsInfiniteListSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
