import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getAuthenticatedUserId = (state: StateSchema) =>
    state?.userSchema?.authenticatedUser?.id ?? "";
