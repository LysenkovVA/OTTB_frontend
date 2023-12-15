import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { getRegisteredUserId } from "@/entities/User";

describe("getRegisteredUserId.test", () => {
    test("Should return registered user id", () => {
        const state: DeepPartial<StateSchema> = {
            userSchema: {
                registeredUserId: "1",
            },
        };
        expect(getRegisteredUserId(state as StateSchema)).toEqual("1");
    });

    test("Should return empty registered user id for empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getRegisteredUserId(state as StateSchema)).toEqual("");
    });
});
