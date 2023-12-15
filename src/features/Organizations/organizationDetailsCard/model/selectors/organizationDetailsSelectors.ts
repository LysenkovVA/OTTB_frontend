import { StateSchema } from "@/app/providers/StoreProvider";

export const getOrganizationDetailsIsLoading = (state: StateSchema) =>
    state.organizationDetailsSchema?.isLoading ?? false;

export const getOrganizationDetailsError = (state: StateSchema) =>
    state.organizationDetailsSchema?.error ?? "";

export const getOrganizationDetails = (state: StateSchema) =>
    state.organizationDetailsSchema?.organizationDetails;

export const getOrganizationDetailsForm = (state: StateSchema) =>
    state.organizationDetailsSchema?.organizationDetailsForm;

export const getOrganizationDetailsIsInitialized = (state: StateSchema) =>
    state.organizationDetailsSchema?._isInitialized ?? false;
