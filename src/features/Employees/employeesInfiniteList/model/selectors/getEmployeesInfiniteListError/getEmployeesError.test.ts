import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesInfiniteListError } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListError/getEmployeesInfiniteListError";

describe("getEmployeesError.test", () => {
    test("Should return error", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                error: "error",
            },
        };

        expect(getEmployeesInfiniteListError(state as StateSchema)).toEqual(
            "error",
        );
    });

    test("Should return empty string with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesInfiniteListError(state as StateSchema)).toEqual("");
    });
});
