import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { departmentsInfiniteListAdapter } from "../adapter/departmentsInfiniteListAdapter";

const getDepartmentsInfiniteListSchema = (state: StateSchema) => {
    return state.departmentsInfiniteListSchema;
};

export const getDepartmentsInfiniteList =
    departmentsInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.departmentsInfiniteListSchema ??
            departmentsInfiniteListAdapter.getInitialState(),
    );

export const getDepartmentsInfiniteListIsLoading = createSelector(
    getDepartmentsInfiniteListSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getDepartmentsInfiniteListError = createSelector(
    getDepartmentsInfiniteListSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getDepartmentsInfiniteListLimit = createSelector(
    getDepartmentsInfiniteListSchema,
    (schema) => {
        return schema?.limit ?? 10;
    },
);

export const getDepartmentsInfiniteListOffset = createSelector(
    getDepartmentsInfiniteListSchema,
    (schema) => {
        return schema?.offset ?? 0;
    },
);

export const getDepartmentsInfiniteListHasMore = createSelector(
    getDepartmentsInfiniteListSchema,
    (schema) => {
        return schema?.hasMore ?? false;
    },
);

export const getDepartmentsInfiniteListIsInitialized = createSelector(
    getDepartmentsInfiniteListSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
