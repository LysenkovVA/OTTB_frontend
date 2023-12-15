import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeeListsHasMore = (state: StateSchema) =>
    state?.employeesInfiniteListSchema?.hasMore ?? false;
