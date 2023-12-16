import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getSignUpSchema = (state: StateSchema) => state?.signUpSchema;

export const getSignUpEmail = createSelector(getSignUpSchema, (schema) => {
    return schema?.email ?? "";
});

export const getSignUpPassword = createSelector(getSignUpSchema, (schema) => {
    return schema?.password ?? "";
});

export const getSignUpRepeatedPassword = createSelector(
    getSignUpSchema,
    (schema) => {
        return schema?.repeatedPassword ?? "";
    },
);

export const getSignUpError = createSelector(getSignUpSchema, (schema) => {
    return schema?.error ?? "";
});

export const getSignUpIsLoading = createSelector(getSignUpSchema, (schema) => {
    return schema?.isLoading ?? false;
});
