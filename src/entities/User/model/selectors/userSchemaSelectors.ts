import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getUserSchema = (state: StateSchema) => state?.userSchema;

// Обязательно использовать мемоизацию, иначе при обновлении страницы сбрасывается путь
export const getUser = createSelector(getUserSchema, (userSchema) => {
    return userSchema?.authenticatedUser ?? undefined;
});

export const getUserIsLoading = createSelector(getUserSchema, (userSchema) => {
    return userSchema.isLoading ?? false;
});

export const getUserError = createSelector(getUserSchema, (userSchema) => {
    return userSchema.error ?? "";
});

export const getUserIsInitialized = createSelector(
    getUserSchema,
    (userSchema) => {
        return userSchema._isInitialized ?? false;
    },
);

export const getRegisteredUserId = createSelector(
    getUserSchema,
    (userSchema) => {
        return userSchema.registeredUserId ?? "";
    },
);
