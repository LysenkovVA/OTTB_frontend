import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getLogoutError = (state: StateSchema) =>
    state?.logoutSchema?.error || "";
