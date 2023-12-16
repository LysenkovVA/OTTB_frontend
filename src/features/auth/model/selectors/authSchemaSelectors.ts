import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

export const getAuthSchema = (state: StateSchema) => state?.authSchema;

export const getAuthEmail = createSelector(getAuthSchema, (authSchema) => {
    return authSchema?.email ?? "";
});

export const getAuthPassword = createSelector(getAuthSchema, (authSchema) => {
    return authSchema?.password ?? "";
});

export const getAuthIsLoading = createSelector(getAuthSchema, (authSchema) => {
    return authSchema?.isLoading ?? false;
});

export const getAuthError = createSelector(getAuthSchema, (authSchema) => {
    return authSchema?.error ?? "";
});
