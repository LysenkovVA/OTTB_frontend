import { StateSchema } from "@/app/providers/StoreProvider";
import { allBerthesAdapter } from "../adapter/allBerthesAdapter";

export const getAllBerthes = allBerthesAdapter.getSelectors<StateSchema>(
    (state) => state.allBerthesSchema ?? allBerthesAdapter.getInitialState(),
);

export const getAllBerthesIsLoading = (state: StateSchema) =>
    state?.allBerthesSchema?.isLoading ?? false;

export const getAllBerthesError = (state: StateSchema) =>
    state?.allBerthesSchema?.error ?? "";

export const getAllBerthesIsInitialized = (state: StateSchema) =>
    state?.allBerthesSchema?._isInitialized ?? false;
