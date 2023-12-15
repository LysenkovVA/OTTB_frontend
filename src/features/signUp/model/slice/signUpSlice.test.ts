import { SignUpSchema, signUpReducer } from "../../index";
import { signUpActions } from "../../model/slice/signUpSlice";

describe("signUpSlice.test", () => {
    test("Test set email", () => {
        const state: DeepPartial<SignUpSchema> = { email: "" };
        expect(
            signUpReducer(
                state as SignUpSchema,
                signUpActions.setEmail("email@email.ru"),
            ),
        ).toEqual({ email: "email@email.ru" });
    });

    test("Test set password", () => {
        const state: DeepPartial<SignUpSchema> = { password: "" };
        expect(
            signUpReducer(
                state as SignUpSchema,
                signUpActions.setPassword("123123"),
            ),
        ).toEqual({ password: "123123" });
    });

    test("Test set repeated password", () => {
        const state: DeepPartial<SignUpSchema> = { repeatedPassword: "" };
        expect(
            signUpReducer(
                state as SignUpSchema,
                signUpActions.setRepeatedPassword("123123"),
            ),
        ).toEqual({ repeatedPassword: "123123" });
    });

    test("Test set error", () => {
        const state: DeepPartial<SignUpSchema> = { error: "" };
        expect(
            signUpReducer(
                state as SignUpSchema,
                signUpActions.setError("error"),
            ),
        ).toEqual({ error: "error" });
    });
});
