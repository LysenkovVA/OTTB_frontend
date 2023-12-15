import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getAuthenticatedUserId } from "./getAuthenticatedUserId";

describe("getAuthenticatedUserId.test", () => {
    test("Should return authenticated user id", () => {
        const state: DeepPartial<StateSchema> = {
            userSchema: {
                authenticatedUser: {
                    id: "1",
                },
            },
        };
        expect(getAuthenticatedUserId(state as StateSchema)).toEqual("1");
    });

    test("Should return empty string for empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAuthenticatedUserId(state as StateSchema)).toEqual("");
    });
});
