import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getCertificateTypeDetailsSchema = (state: StateSchema) => {
    return state.certificateTypeDetailsSchema;
};

export const getCertificateTypeDetails = createSelector(
    getCertificateTypeDetailsSchema,
    (schema) => {
        return schema?.certificateTypeDetails ?? undefined;
    },
);

export const getCertificateTypeDetailsForm = createSelector(
    getCertificateTypeDetailsSchema,
    (schema) => {
        return schema?.certificateTypeDetailsForm ?? undefined;
    },
);

export const getCertificateTypeDetailsIsLoading = createSelector(
    getCertificateTypeDetailsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getCertificateTypeDetailsError = createSelector(
    getCertificateTypeDetailsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getCertificateTypeDetailsIsInitialized = createSelector(
    getCertificateTypeDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
