import { StateSchema } from "@/app/providers/StoreProvider";
import { allOrganizationsAdapter } from "../adapter/allOrganizationsAdapter";

export const getAllOrganizations =
    allOrganizationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.allOrganizationsSchema ??
            allOrganizationsAdapter.getInitialState(),
    );

export const getAllOrganizationsIsLoading = (state: StateSchema) =>
    state?.allOrganizationsSchema?.isLoading ?? false;

export const getAllOrganizationsError = (state: StateSchema) =>
    state?.allOrganizationsSchema?.error ?? "";

export const getAllOrganizationsIsInitialized = (state: StateSchema) =>
    state?.allOrganizationsSchema?._isInitialized ?? false;
