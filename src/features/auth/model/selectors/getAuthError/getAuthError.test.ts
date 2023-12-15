import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getAuthError } from "./getAuthError";

describe("getAuthError.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            authSchema: {
                error: "error",
            },
        };

        expect(getAuthError(state as StateSchema)).toEqual("error");
    });
    test("Should return empty error with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getAuthError(state as StateSchema)).toEqual("");
    });
});
