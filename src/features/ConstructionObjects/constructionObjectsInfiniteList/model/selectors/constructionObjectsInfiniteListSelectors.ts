import { StateSchema } from "@/app/providers/StoreProvider";
import { constructionObjectsInfiniteListAdapter } from "../adapter/constructionObjectsInfiniteListAdapter";

export const getConstructionObjectsInfiniteList =
    constructionObjectsInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.constructionObjectsInfiniteListSchema ??
            constructionObjectsInfiniteListAdapter.getInitialState(),
    );

export const getConstructionObjectsInfiniteListIsLoading = (
    state: StateSchema,
) => state?.constructionObjectsInfiniteListSchema?.isLoading ?? false;

export const getConstructionObjectsInfiniteListError = (state: StateSchema) =>
    state?.constructionObjectsInfiniteListSchema?.error ?? "";

export const getConstructionObjectsInfiniteListLimit = (state: StateSchema) =>
    state?.constructionObjectsInfiniteListSchema?.limit ?? 10;

export const getConstructionObjectsInfiniteListOffset = (state: StateSchema) =>
    state?.constructionObjectsInfiniteListSchema?.offset ?? 0;

export const getConstructionObjectsInfiniteListHasMore = (state: StateSchema) =>
    state?.constructionObjectsInfiniteListSchema?.hasMore ?? false;

export const getConstructionObjectsInfiniteListIsInitialized = (
    state: StateSchema,
) => state?.constructionObjectsInfiniteListSchema?._isInitialized ?? false;
