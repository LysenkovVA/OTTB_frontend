import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getSignUpIsLoading } from "./getSignUpIsLoading";

describe("getSignUpIsLoading.test", () => {
    test("Should return 'true' value", () => {
        const state: DeepPartial<StateSchema> = {
            signUpSchema: {
                isLoading: true,
            },
        };
        expect(getSignUpIsLoading(state as StateSchema)).toEqual(true);
    });
    test("Should return 'false' value", () => {
        const state: DeepPartial<StateSchema> = {
            signUpSchema: {
                isLoading: false,
            },
        };
        expect(getSignUpIsLoading(state as StateSchema)).toEqual(false);
    });
    test("Should return 'false' value with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getSignUpIsLoading(state as StateSchema)).toEqual(false);
    });
});
