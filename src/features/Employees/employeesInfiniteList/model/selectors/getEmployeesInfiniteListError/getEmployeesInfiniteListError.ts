import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesInfiniteListError = (state: StateSchema) =>
    state?.employeesInfiniteListSchema?.error ?? "";
