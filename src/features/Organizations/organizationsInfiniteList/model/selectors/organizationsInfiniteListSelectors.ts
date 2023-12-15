import { StateSchema } from "@/app/providers/StoreProvider";
import { organizationsInfiniteListAdapter } from "../adapter/organizationsInfiniteListAdapter";

export const getOrganizationsInfiniteList =
    organizationsInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.organizationsInfiniteListSchema ??
            organizationsInfiniteListAdapter.getInitialState(),
    );

export const getOrganizationsInfiniteListIsLoading = (state: StateSchema) =>
    state?.organizationsInfiniteListSchema?.isLoading ?? false;

export const getOrganizationsInfiniteListError = (state: StateSchema) =>
    state?.organizationsInfiniteListSchema?.error ?? "";

export const getOrganizationsInfiniteListLimit = (state: StateSchema) =>
    state?.organizationsInfiniteListSchema?.limit ?? 10;

export const getOrganizationsInfiniteListOffset = (state: StateSchema) =>
    state?.organizationsInfiniteListSchema?.offset ?? 0;

export const getOrganizationsInfiniteListHasMore = (state: StateSchema) =>
    state?.organizationsInfiniteListSchema?.hasMore ?? false;

export const getOrganizationsInfiniteListIsInitialized = (state: StateSchema) =>
    state?.organizationsInfiniteListSchema?._isInitialized ?? false;
