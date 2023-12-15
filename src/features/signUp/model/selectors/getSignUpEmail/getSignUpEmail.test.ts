import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getSignUpEmail } from "./getSignUpEmail";

describe("getSignUpEmail.test", () => {
    test("Should return email", () => {
        const state: DeepPartial<StateSchema> = {
            signUpSchema: {
                email: "email@email.ru",
            },
        };
        expect(getSignUpEmail(state as StateSchema)).toEqual("email@email.ru");
    });

    test("Should return empty email with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getSignUpEmail(state as StateSchema)).toEqual("");
    });
});
