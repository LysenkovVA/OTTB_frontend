import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getSignUpRepeatedPassword } from "./getSignUpRepeatedPassword";

describe("getSignUpRepeatedPassword.test", () => {
    test("Should return repeated password", () => {
        const state: DeepPartial<StateSchema> = {
            signUpSchema: {
                repeatedPassword: "123",
            },
        };
        expect(getSignUpRepeatedPassword(state as StateSchema)).toEqual("123");
    });

    test("Should return empty repeated password with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getSignUpRepeatedPassword(state as StateSchema)).toEqual("");
    });
});
