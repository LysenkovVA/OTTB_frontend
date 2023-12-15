import { StateSchema } from "@/app/providers/StoreProvider";
import { allDepartmentsAdapter } from "../adapter/allDepartmentsAdapter";

export const getAllDepartments =
    allDepartmentsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.allDepartmentsSchema ??
            allDepartmentsAdapter.getInitialState(),
    );

export const getAllDepartmentsIsLoading = (state: StateSchema) =>
    state?.allDepartmentsSchema?.isLoading ?? false;

export const getAllDepartmentsError = (state: StateSchema) =>
    state?.allDepartmentsSchema?.error ?? "";

export const getAllDepartmentsIsInitialized = (state: StateSchema) =>
    state?.allDepartmentsSchema?._isInitialized ?? false;
