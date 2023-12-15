import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getUserIsInited = (state: StateSchema) =>
    state?.userSchema?._isInitialized ?? "false";
