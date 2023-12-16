import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { certificatesInfiniteListAdapter } from "../adapter/certificatesInfiniteListAdapter";

const getCertificatesInfiniteListSchema = (state: StateSchema) => {
    return state.certificatesInfiniteListSchema;
};

export const getCertificatesInfiniteList =
    certificatesInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.certificatesInfiniteListSchema ??
            certificatesInfiniteListAdapter.getInitialState(),
    );

export const getCertificatesInfiniteListIsLoading = createSelector(
    getCertificatesInfiniteListSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getCertificatesInfiniteListError = createSelector(
    getCertificatesInfiniteListSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getCertificatesInfiniteListLimit = createSelector(
    getCertificatesInfiniteListSchema,
    (schema) => {
        return schema?.limit ?? 10;
    },
);

export const getCertificatesInfiniteListOffset = createSelector(
    getCertificatesInfiniteListSchema,
    (schema) => {
        return schema?.offset ?? 0;
    },
);

export const getCertificatesInfiniteListHasMore = createSelector(
    getCertificatesInfiniteListSchema,
    (schema) => {
        return schema?.hasMore ?? false;
    },
);

export const getCertificatesInfiniteListIsInitialized = createSelector(
    getCertificatesInfiniteListSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
