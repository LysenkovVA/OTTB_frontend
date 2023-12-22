import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

const getDepartmentDetailsSchema = (state: StateSchema) => {
    return state.departmentDetailsSchema;
};

export const getDepartmentDetails = createSelector(
    getDepartmentDetailsSchema,
    (schema) => {
        return schema?.departmentDetails ?? undefined;
    },
);

export const getDepartmentDetailsForm = createSelector(
    getDepartmentDetailsSchema,
    (schema) => {
        return schema?.departmentDetailsForm ?? undefined;
    },
);

export const getDepartmentDetailsIsDataLoading = createSelector(
    getDepartmentDetailsSchema,
    (schema) => {
        return schema?.isDataLoading ?? false;
    },
);

export const getDepartmentDetailsDataError = createSelector(
    getDepartmentDetailsSchema,
    (schema) => {
        return schema?.dataError ?? "";
    },
);

export const getDepartmentDetailsIsInitialized = createSelector(
    getDepartmentDetailsSchema,
    (schema) => {
        return schema?._isInitialized ?? false;
    },
);
