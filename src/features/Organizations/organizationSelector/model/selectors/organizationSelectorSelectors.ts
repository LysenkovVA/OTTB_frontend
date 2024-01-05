import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { organizationSelectorAdapter } from "../adapter/organizationSelectorAdapter";

const getOrganizationSelectorSchema = (state: StateSchema) => {
    return state.organizationSelectorSchema;
};

export const getAllOrganizations =
    organizationSelectorAdapter.getSelectors<StateSchema>(
        (state) =>
            state.organizationSelectorSchema ??
            organizationSelectorAdapter.getInitialState(),
    );

export const getAllOrganizationsIsLoading = createSelector(
    getOrganizationSelectorSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getAllOrganizationsError = createSelector(
    getOrganizationSelectorSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getAllOrganizationsIsInitialized = createSelector(
    getOrganizationSelectorSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
