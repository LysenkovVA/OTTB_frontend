import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeeListsHasMore } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesHasMore/getEmployeesHasMore";

describe("getEmployeesHasMore.test", () => {
    test("Should return 'true' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                hasMore: true,
            },
        };

        expect(getEmployeeListsHasMore(state as StateSchema)).toEqual(true);
    });

    test("Should return 'false' value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                hasMore: false,
            },
        };

        expect(getEmployeeListsHasMore(state as StateSchema)).toEqual(false);
    });

    test("Should return 'false' with empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeeListsHasMore(state as StateSchema)).toEqual(false);
    });
});
