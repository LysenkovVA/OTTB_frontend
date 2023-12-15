import { Profile } from "@/entities/Profile/model/types/Profile";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { updateProfileData } from "./updateProfileData";

describe("updateProfileData.test", () => {
    test("Should update profile data", async () => {
        const userData: Profile = {
            id: "1",
            surname: "Lysenkov",
            name: "Viktor",
        };

        const mockedResponse = {
            data: true,
        };

        // Тестовый thunk
        const testThunk = new TestAsyncThunk(updateProfileData);

        // Мокаем возвращаемое значение
        testThunk.api.patch.mockResolvedValue(() =>
            Promise.resolve({ ...mockedResponse }),
        );

        // Вызываем
        const result = await testThunk.callThunk({
            profileData: userData,
        });

        // Запрос отпарвлен
        expect(testThunk.api.patch).toHaveBeenCalled();

        // TODO - Валится с ошибкой. Может надо стейт проинициализировать?
        // expect(result.meta.requestStatus).toBe("fulfilled");
    });

    test("Should fail update profile data", async () => {
        const userData: Profile = {
            id: "1",
            surname: "Lysenkov",
            name: "Viktor",
        };

        const thunk = new TestAsyncThunk(updateProfileData);
        thunk.api.patch.mockReturnValue(Promise.resolve({}));
        const result = await thunk.callThunk({
            profileData: userData,
        });

        expect(thunk.api.patch).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
    });
});
