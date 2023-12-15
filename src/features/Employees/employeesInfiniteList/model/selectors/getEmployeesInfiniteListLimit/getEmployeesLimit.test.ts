import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesInfiniteListLimit } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListLimit/getEmployeesInfiniteListLimit";

describe("getEmployeesLimit.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                limit: 10,
            },
        };

        expect(getEmployeesInfiniteListLimit(state as StateSchema)).toEqual(10);
    });

    test("Should return default limit value for empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesInfiniteListLimit(state as StateSchema)).toEqual(10);
    });
});
