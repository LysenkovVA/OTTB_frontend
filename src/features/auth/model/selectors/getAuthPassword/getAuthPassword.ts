import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const getAuthPassword = (state: StateSchema) =>
    state?.authSchema?.password || "";
