import { StateSchema } from "@/app/providers/StoreProvider";
import { employeesInfiniteListAdapter } from "@/features/Employees/employeesInfiniteList/model/adapter/employeesInfiniteListAdapter";
import { createSelector } from "@reduxjs/toolkit";

const getEmployeesInfiniteListSchema = (state: StateSchema) => {
    return state.employeesInfiniteListSchema;
};

export const getEmployeesInfiniteList =
    employeesInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.employeesInfiniteListSchema ??
            employeesInfiniteListAdapter.getInitialState(),
    );

export const getEmployeesInfiniteListIsLoading = createSelector(
    getEmployeesInfiniteListSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getEmployeesInfiniteListError = createSelector(
    getEmployeesInfiniteListSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getEmployeesInfiniteListLimit = createSelector(
    getEmployeesInfiniteListSchema,
    (schema) => {
        return schema?.limit ?? 10;
    },
);

export const getEmployeesInfiniteListOffset = createSelector(
    getEmployeesInfiniteListSchema,
    (schema) => {
        return schema?.offset ?? 0;
    },
);

export const getEmployeeListsHasMore = createSelector(
    getEmployeesInfiniteListSchema,
    (schema) => {
        return schema?.hasMore ?? false;
    },
);

export const getEmployeesInfiniteListSearchQuery = createSelector(
    getEmployeesInfiniteListSchema,
    (schema) => {
        return schema?.searchQuery ?? "";
    },
);

export const getEmployeesInfiniteListIsInitialized = createSelector(
    getEmployeesInfiniteListSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
