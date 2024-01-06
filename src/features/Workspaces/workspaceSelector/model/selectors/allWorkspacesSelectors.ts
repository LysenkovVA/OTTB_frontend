import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { allWorkspacesAdapter } from "../adapter/allWorkspacesAdapter";

const getAllWorkspacesSchema = (state: StateSchema) => {
    return state.allWorkspacesSchema;
};

export const getAllWorkspaces = allWorkspacesAdapter.getSelectors<StateSchema>(
    (state) =>
        state.allWorkspacesSchema ?? allWorkspacesAdapter.getInitialState(),
);

export const getAllWorkspacesIsLoading = createSelector(
    getAllWorkspacesSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getAllWorkspacesError = createSelector(
    getAllWorkspacesSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getAllWorkspacesIsInitialized = createSelector(
    getAllWorkspacesSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
