import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesInfiniteListIsInitialized } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListIsInitialized/getEmployeesInfiniteListIsInitialized";

describe("getEmployeesInitialized.test", () => {
    test("Should return 'true' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                _isInitialized: true,
            },
        };

        expect(
            getEmployeesInfiniteListIsInitialized(state as StateSchema),
        ).toEqual(true);
    });

    test("Should return 'false' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                _isInitialized: false,
            },
        };

        expect(
            getEmployeesInfiniteListIsInitialized(state as StateSchema),
        ).toEqual(false);
    });

    test("Should return 'false' with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(
            getEmployeesInfiniteListIsInitialized(state as StateSchema),
        ).toEqual(false);
    });
});
