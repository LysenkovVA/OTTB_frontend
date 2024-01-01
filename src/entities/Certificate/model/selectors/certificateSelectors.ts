import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getCertificateDetailsSchema = (state: StateSchema) => {
    return state.certificateDetailsSchema;
};

export const getCertificateDetails = createSelector(
    getCertificateDetailsSchema,
    (schema) => {
        return schema?.certificateDetails ?? undefined;
    },
);

export const getCertificateDetailsForm = createSelector(
    getCertificateDetailsSchema,
    (schema) => {
        return schema?.certificateDetailsForm ?? undefined;
    },
);

export const getCertificateDetailsIsLoading = createSelector(
    getCertificateDetailsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getCertificateDetailsError = createSelector(
    getCertificateDetailsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getCertificateDetailsIsInitialized = createSelector(
    getCertificateDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
