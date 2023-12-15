import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getSignUpRepeatedPassword = (state: StateSchema) =>
    state?.signUpSchema?.repeatedPassword || "";
