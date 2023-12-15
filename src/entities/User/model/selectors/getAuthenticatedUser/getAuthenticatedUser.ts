import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getAuthenticatedUser = (state: StateSchema) =>
    state?.userSchema?.authenticatedUser ?? {};

export const getAuthenticatedUserIsLoading = (state: StateSchema) =>
    state?.userSchema?.isLoading ?? false;

export const getAuthenticatedUserError = (state: StateSchema) =>
    state?.userSchema?.error ?? "";
