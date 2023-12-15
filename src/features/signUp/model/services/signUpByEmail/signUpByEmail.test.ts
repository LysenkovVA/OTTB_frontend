import { signUpByEmail } from "@/features/signUp/model/services/signUpByEmail/signUpByEmail";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

describe("signUpByEmail.test", () => {
    test("Should sign up successfully", async () => {
        const mockedResponse = {
            data: {
                id: "1",
            },
        };

        // Тестовый thunk
        const testThunk = new TestAsyncThunk(signUpByEmail);

        // Мокаем возвращаемое значение
        testThunk.api.post.mockResolvedValue(
            Promise.resolve({ ...mockedResponse }),
        );

        // Вызываем
        const result = await testThunk.callThunk({
            email: "user1@mail.ru",
            password: "123456",
        });

        // Запрос отпарвлен
        expect(testThunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
    });
    test("Should fail sign up", async () => {
        const thunk = new TestAsyncThunk(signUpByEmail);
        thunk.api.post.mockReturnValue(Promise.resolve({}));
        const result = await thunk.callThunk({
            email: "user1@mail.ru",
            password: "1234567",
        });

        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
    });
});
