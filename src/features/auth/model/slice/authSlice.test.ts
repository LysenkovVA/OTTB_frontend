import { AuthSchema } from "../../index";
import { authActions, authReducer } from "../../model/slice/authSlice";

describe("authSlice.test", () => {
    test("Should set email", () => {
        const state: DeepPartial<AuthSchema> = { email: "" };
        expect(
            authReducer(
                state as AuthSchema,
                authActions.setEmail("email@email.ru"),
            ),
        ).toEqual({ email: "email@email.ru" });
    });

    test("Should set password", () => {
        const state: DeepPartial<AuthSchema> = { password: "" };
        expect(
            authReducer(state as AuthSchema, authActions.setPassword("123123")),
        ).toEqual({ password: "123123" });
    });
});
