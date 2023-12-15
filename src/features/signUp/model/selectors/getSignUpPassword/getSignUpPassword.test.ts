import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getSignUpPassword } from "./getSignUpPassword";

describe("getSignUpPassword.test", () => {
    test("Should return password", () => {
        const state: DeepPartial<StateSchema> = {
            signUpSchema: {
                password: "123",
            },
        };
        expect(getSignUpPassword(state as StateSchema)).toEqual("123");
    });

    test("Should return empty password with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getSignUpPassword(state as StateSchema)).toEqual("");
    });
});
