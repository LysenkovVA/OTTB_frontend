import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesInfiniteListLimit = (state: StateSchema) =>
    state?.employeesInfiniteListSchema?.limit ?? 10;
