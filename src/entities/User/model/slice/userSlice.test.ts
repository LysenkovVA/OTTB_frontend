import { userActions, userReducer } from "../slice/userSlice";
import { UserSchema } from "../types/UserSchema";

describe("userSlice.test", () => {
    test("Test set authenticated user", () => {
        const state: DeepPartial<UserSchema> = {};
        expect(
            userReducer(
                state as UserSchema,
                userActions.setAuthData({
                    id: "1",
                    email: "email@email.ru,",
                    // token: "TOKEN",
                }),
            ),
        ).toEqual({
            authenticatedUser: {
                id: "1",
                email: "email@email.ru,",
                // token: "TOKEN",
            },
        });
    });

    // TODO - setProfileData

    // TODO - initAuthData

    // TODO - logout

    test("Test set registeredUserId", () => {
        const state: DeepPartial<UserSchema> = {};
        expect(
            userReducer(
                state as UserSchema,
                userActions.setRegisteredData("1"),
            ),
        ).toEqual({
            registeredUserId: "1",
        });
    });
});
