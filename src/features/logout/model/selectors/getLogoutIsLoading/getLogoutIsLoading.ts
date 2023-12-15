import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getLogoutIsLoading = (state: StateSchema) =>
    state?.logoutSchema?.isLoading || false;
