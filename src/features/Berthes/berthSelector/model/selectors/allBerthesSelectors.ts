import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { allBerthesAdapter } from "../adapter/allBerthesAdapter";

const getAllBerthesSchema = (state: StateSchema) => {
    return state.allBerthesSchema;
};

export const getAllBerthes = allBerthesAdapter.getSelectors<StateSchema>(
    (state) => state.allBerthesSchema ?? allBerthesAdapter.getInitialState(),
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
