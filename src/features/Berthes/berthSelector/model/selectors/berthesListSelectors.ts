import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { berthesListAdapter } from "../adapter/berthesListAdapter";

const getAllBerthesSchema = (state: StateSchema) => {
    return state.allBerthesSchema;
};

export const getAllBerthes = berthesListAdapter.getSelectors<StateSchema>(
    (state) => state.allBerthesSchema ?? berthesListAdapter.getInitialState(),
);

export const getAllBerthesIsLoading = createSelector(
    getAllBerthesSchema,
    (allBerthesSchema) => {
        return allBerthesSchema?.isLoading ?? false;
    },
);

export const getAllBerthesError = createSelector(
    getAllBerthesSchema,
    (allBerthesSchema) => {
        return allBerthesSchema?.error ?? "";
    },
);

export const getAllBerthesIsInitialized = createSelector(
    getAllBerthesSchema,
    (allBerthesSchema) => {
        return allBerthesSchema?._isInitialized ?? false;
    },
);
