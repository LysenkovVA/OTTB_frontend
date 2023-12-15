import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getAuthEmail } from "./getAuthEmail";

describe("getAuthEmail.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            authSchema: {
                email: "email@email.ru",
            },
        };
        expect(getAuthEmail(state as StateSchema)).toEqual("email@email.ru");
    });

    test("Should return empty email with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAuthEmail(state as StateSchema)).toEqual("");
    });
});
