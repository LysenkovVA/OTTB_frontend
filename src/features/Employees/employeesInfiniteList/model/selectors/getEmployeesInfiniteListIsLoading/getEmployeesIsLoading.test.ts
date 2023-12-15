import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesInfiniteListIsLoading } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListIsLoading/getEmployeesInfiniteListIsLoading";

describe("getEmployeesIsLoading.test", () => {
    test("Should return 'true' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                isLoading: true,
            },
        };

        expect(getEmployeesInfiniteListIsLoading(state as StateSchema)).toEqual(
            true,
        );
    });

    test("Should return 'false' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                isLoading: false,
            },
        };

        expect(getEmployeesInfiniteListIsLoading(state as StateSchema)).toEqual(
            false,
        );
    });

    test("Should return 'false' with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesInfiniteListIsLoading(state as StateSchema)).toEqual(
            false,
        );
    });
});
