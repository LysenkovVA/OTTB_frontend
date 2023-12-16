import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { createSelector } from "@reduxjs/toolkit";

const getUserSchema = (state: StateSchema) => state?.userSchema ?? {};

// Обязательно использовать мемоизацию, иначе при обновлении страницы сбрасывается путь
export const getAuthenticatedUser = createSelector(
    getUserSchema,
    (userSchema) => {
        return userSchema.authenticatedUser ?? {};
    },
);

export const getAuthenticatedUserIsLoading = (state: StateSchema) =>
    state?.userSchema?.isLoading ?? false;

export const getAuthenticatedUserError = (state: StateSchema) =>
    state?.userSchema?.error ?? "";
