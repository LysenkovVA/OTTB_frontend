import { StateSchema } from "@/app/providers/StoreProvider";
import { departmentsInfiniteListAdapter } from "../adapter/departmentsInfiniteListAdapter";

export const getDepartmentsInfiniteList =
    departmentsInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.departmentsInfiniteListSchema ??
            departmentsInfiniteListAdapter.getInitialState(),
    );

export const getDepartmentsInfiniteListIsLoading = (state: StateSchema) =>
    state?.departmentsInfiniteListSchema?.isLoading ?? false;

export const getDepartmentsInfiniteListError = (state: StateSchema) =>
    state?.departmentsInfiniteListSchema?.error ?? "";

export const getDepartmentsInfiniteListLimit = (state: StateSchema) =>
    state?.departmentsInfiniteListSchema?.limit ?? 10;

export const getDepartmentsInfiniteListOffset = (state: StateSchema) =>
    state?.departmentsInfiniteListSchema?.offset ?? 0;

export const getDepartmentsInfiniteListHasMore = (state: StateSchema) =>
    state?.departmentsInfiniteListSchema?.hasMore ?? false;

export const getDepartmentsInfiniteListIsInitialized = (state: StateSchema) =>
    state?.departmentsInfiniteListSchema?._isInitialized ?? false;
