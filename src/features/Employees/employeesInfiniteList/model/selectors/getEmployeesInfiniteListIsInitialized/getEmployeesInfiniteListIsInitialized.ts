import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesInfiniteListIsInitialized = (state: StateSchema) =>
    state?.employeesInfiniteListSchema?._isInitialized ?? false;
