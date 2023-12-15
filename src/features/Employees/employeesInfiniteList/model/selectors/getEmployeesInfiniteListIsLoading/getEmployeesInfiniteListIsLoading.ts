import { StateSchema } from "@/app/providers/StoreProvider";

export const getEmployeesInfiniteListIsLoading = (state: StateSchema) =>
    state?.employeesInfiniteListSchema?.isLoading ?? false;
