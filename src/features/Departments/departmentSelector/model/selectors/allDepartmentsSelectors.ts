import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";
import { allDepartmentsAdapter } from "../adapter/allDepartmentsAdapter";

const getAllDepartmentsSchema = (state: StateSchema) => {
    return state.allDepartmentsSchema;
};

export const getAllDepartments =
    allDepartmentsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.allDepartmentsSchema ??
            allDepartmentsAdapter.getInitialState(),
    );

export const getAllDepartmentsIsLoading = createSelector(
    getAllDepartmentsSchema,
    (schema) => {
        return schema?.isLoading ?? false;
    },
);

export const getAllDepartmentsError = createSelector(
    getAllDepartmentsSchema,
    (schema) => {
        return schema?.error ?? "";
    },
);

export const getAllDepartmentsIsInitialized = createSelector(
    getAllDepartmentsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
