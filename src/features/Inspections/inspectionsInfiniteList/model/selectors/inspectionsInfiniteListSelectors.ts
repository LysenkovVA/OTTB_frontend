import { StateSchema } from "@/app/providers/StoreProvider";
import { inspectionsInfiniteListAdapter } from "../adapter/inspectionsInfiniteListAdapter";

export const getInspectionsInfiniteList =
    inspectionsInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.inspectionsInfiniteListSchema ??
            inspectionsInfiniteListAdapter.getInitialState(),
    );

export const getInspectionsInfiniteListIsLoading = (state: StateSchema) =>
    state?.inspectionsInfiniteListSchema?.isLoading ?? false;

export const getInspectionsInfiniteListError = (state: StateSchema) =>
    state?.inspectionsInfiniteListSchema?.error ?? "";

export const getInspectionsInfiniteListLimit = (state: StateSchema) =>
    state?.inspectionsInfiniteListSchema?.limit ?? 10;

export const getInspectionInfiniteListOffset = (state: StateSchema) =>
    state?.inspectionsInfiniteListSchema?.offset ?? 0;

export const getInspectionsInfiniteListHasMore = (state: StateSchema) =>
    state?.inspectionsInfiniteListSchema?.hasMore ?? false;

export const getInspectionsInfiniteListIsInitialized = (state: StateSchema) =>
    state?.inspectionsInfiniteListSchema?._isInitialized ?? false;
