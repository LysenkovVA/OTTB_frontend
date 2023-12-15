import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesInfiniteListSearchQuery } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListSearchQuery/getEmployeesInfiniteListSearchQuery";

describe("getEmployeesSearchQuery.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                searchQuery: "search",
            },
        };

        expect(
            getEmployeesInfiniteListSearchQuery(state as StateSchema),
        ).toEqual("search");
    });

    test("Should return empty string for undefined", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                searchQuery: undefined,
            },
        };

        expect(
            getEmployeesInfiniteListSearchQuery(state as StateSchema),
        ).toEqual("");
    });

    test("Should return empty string for empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(
            getEmployeesInfiniteListSearchQuery(state as StateSchema),
        ).toEqual("");
    });
});
