import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getAuthenticatedUser } from "@/entities/User";

describe("getAuthenticatedUser.test", () => {
    test("Should return authenticated user", () => {
        const state: DeepPartial<StateSchema> = {
            userSchema: {
                authenticatedUser: {
                    id: "1",
                    email: "email@email.ru",
                    // token: "TOKEN",
                },
            },
        };

        expect(getAuthenticatedUser(state as StateSchema)).toEqual({
            id: "1",
            email: "email@email.ru",
            // token: "TOKEN",
        });
    });

    test("Should return empty object for empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getAuthenticatedUser(state as StateSchema)).toEqual({});
    });
});
