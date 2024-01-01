import { StateSchema } from "@/app/providers/StoreProvider";
import { certificateTypesListAdapter } from "@/features/CertificateTypes/certificateTypeSelector/model/adapter/certificateTypesListAdapter";
import { createSelector } from "@reduxjs/toolkit";

const getCertificateTypesListSchema = (state: StateSchema) => {
    return state.certificateTypesListSchema;
};

export const getCertificateTypesListSelectors =
    certificateTypesListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.certificateTypesListSchema ??
            certificateTypesListAdapter.getInitialState(),
    );

export const getCertificateTypesListIsLoading = createSelector(
    getCertificateTypesListSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getCertificateTypesListError = createSelector(
    getCertificateTypesListSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getCertificateTypesListIsInitialized = createSelector(
    getCertificateTypesListSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
