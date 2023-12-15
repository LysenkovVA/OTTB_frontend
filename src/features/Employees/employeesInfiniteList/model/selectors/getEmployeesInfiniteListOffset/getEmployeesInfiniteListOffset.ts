import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesInfiniteListOffset = (state: StateSchema) =>
    state?.employeesInfiniteListSchema?.offset ?? 0;
