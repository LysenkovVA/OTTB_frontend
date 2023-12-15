import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getSignUpEmail = (state: StateSchema) =>
    state?.signUpSchema?.email || "";
