import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { allOrganizationsAdapter } from "../adapter/allOrganizationsAdapter";

const getAllOrganizationsSchema = (state: StateSchema) => {
    return state.allOrganizationsSchema;
};

export const getAllOrganizations =
    allOrganizationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.allOrganizationsSchema ??
            allOrganizationsAdapter.getInitialState(),
    );

export const getAllOrganizationsIsLoading = createSelector(
    getAllOrganizationsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getAllOrganizationsError = createSelector(
    getAllOrganizationsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getAllOrganizationsIsInitialized = createSelector(
    getAllOrganizationsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
