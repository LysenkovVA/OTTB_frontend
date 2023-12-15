import { fetchEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/fetchEmployeesInfiniteList/fetchEmployeesInfiniteList";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";

describe("fetchEmployees.test", () => {
    test("Should return data", async () => {
        const mockedResponse = {
            data: {
                count: 1,
                rows: [],
            },
        };

        // Тестовый thunk
        const testThunk = new TestAsyncThunk(fetchEmployeesInfiniteList);

        // Мокаем возвращаемое значение
        testThunk.api.get.mockResolvedValue(
            Promise.resolve({ ...mockedResponse }),
        );

        // Вызываем
        const result = await testThunk.callThunk({});

        // Запрос отпарвлен
        expect(testThunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
    });

    test("Should fail fetching", async () => {
        const thunk = new TestAsyncThunk(fetchEmployeesInfiniteList);
        thunk.api.get.mockReturnValue(Promise.resolve({}));
        const result = await thunk.callThunk({});

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
    });
});
