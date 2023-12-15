import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getAuthPassword } from "./getAuthPassword";

describe("getAuthPassword.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            authSchema: {
                password: "123",
            },
        };
        expect(getAuthPassword(state as StateSchema)).toEqual("123");
    });

    test("Should return empty password with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAuthPassword(state as StateSchema)).toEqual("");
    });
});
