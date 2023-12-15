import { StateSchema } from "@/app/providers/StoreProvider";
import { certificatesInfiniteListAdapter } from "../adapter/certificatesInfiniteListAdapter";

export const getCertificatesInfiniteList =
    certificatesInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.certificatesInfiniteListSchema ??
            certificatesInfiniteListAdapter.getInitialState(),
    );

export const getCertificatesInfiniteListIsLoading = (state: StateSchema) =>
    state?.certificatesInfiniteListSchema?.isLoading ?? false;

export const getCertificatesInfiniteListError = (state: StateSchema) =>
    state?.certificatesInfiniteListSchema?.error ?? "";

export const getCertificatesInfiniteListLimit = (state: StateSchema) =>
    state?.certificatesInfiniteListSchema?.limit ?? 10;

export const getCertificatesInfiniteListOffset = (state: StateSchema) =>
    state?.certificatesInfiniteListSchema?.offset ?? 0;

export const getCertificatesInfiniteListHasMore = (state: StateSchema) =>
    state?.certificatesInfiniteListSchema?.hasMore ?? false;

export const getCertificatesInfiniteListIsInitialized = (state: StateSchema) =>
    state?.certificatesInfiniteListSchema?._isInitialized ?? false;
