import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getAuthIsLoading } from "./getAuthIsLoading";

describe("getAuthIsLoading.test", () => {
    test("Should return 'true' value", () => {
        const state: DeepPartial<StateSchema> = {
            authSchema: {
                isLoading: true,
            },
        };
        expect(getAuthIsLoading(state as StateSchema)).toEqual(true);
    });

    test("Should return 'false' value", () => {
        const state: DeepPartial<StateSchema> = {
            authSchema: {
                isLoading: false,
            },
        };
        expect(getAuthIsLoading(state as StateSchema)).toEqual(false);
    });

    test("Should return 'false' with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAuthIsLoading(state as StateSchema)).toEqual(false);
    });
});
