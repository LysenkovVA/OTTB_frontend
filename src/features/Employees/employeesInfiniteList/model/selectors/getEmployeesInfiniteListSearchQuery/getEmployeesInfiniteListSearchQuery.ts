import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesInfiniteListSearchQuery = (state: StateSchema) =>
    state?.employeesInfiniteListSchema?.searchQuery ?? "";
