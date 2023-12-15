import { fetchEmployeeDetailsById } from "@/features/Employees/employeeDetailsCard/model/services/fetchEmployeeDetailsById/fetchEmployeeDetailsById";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

describe("fetchEmployeeById.test", () => {
    test("Should fetch employee by id", async () => {
        const mockedResponse = {
            data: {
                id: "1",
                email: "user1@mail.ru",
                surname: "Lysenkov",
                name: "Viktor",
                birthDate: "1986-03-30",
                avatar: "",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyMUBtYWlsLnJ1Iiwicm9sZXMiOlt7ImlkIjoyLCJ2YWx1ZSI6IlVTRVIiLCJkZXNjcmlwdGlvbiI6ItCg0L7Qu9GMINC_0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyIsIlVzZXJSb2xlcyI6eyJpZCI6MywidXNlcklkIjozLCJyb2xlSWQiOjJ9fV0sImlhdCI6MTY5OTkwMjIwOSwiZXhwIjoxNjk5OTg4NjA5fQ.p-lKGHe2Oak2YAWZYEtISdNP9b2HbzgkHO2ukLEmNvo",
            },
        };

        // Тестовый thunk
        const testThunk = new TestAsyncThunk(fetchEmployeeDetailsById);

        // Мокаем возвращаемое значение
        testThunk.api.get.mockResolvedValue(
            Promise.resolve({ ...mockedResponse }),
        );

        // Вызываем
        const result = await testThunk.callThunk({
            id: "1",
        });

        // Запрос отпарвлен
        expect(testThunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
    });

    test("Should fail fetching employee by id", async () => {
        const thunk = new TestAsyncThunk(fetchEmployeeDetailsById);
        thunk.api.get.mockReturnValue(Promise.resolve({}));
        const result = await thunk.callThunk({
            id: "1",
        });

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
    });
});
