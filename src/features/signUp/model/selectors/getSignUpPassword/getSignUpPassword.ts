import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getSignUpPassword = (state: StateSchema) =>
    state?.signUpSchema?.password || "";
