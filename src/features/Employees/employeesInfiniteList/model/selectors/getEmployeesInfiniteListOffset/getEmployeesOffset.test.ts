import { StateSchema } from "@/app/providers/StoreProvider";
import { getEmployeesInfiniteListOffset } from "@/features/Employees/employeesInfiniteList/model/selectors/getEmployeesInfiniteListOffset/getEmployeesInfiniteListOffset";

describe("getEmployeesOffset.test", () => {
    test("Should return value", () => {
        const state: DeepPartial<StateSchema> = {
            employeesInfiniteListSchema: {
                offset: 10,
            },
        };

        expect(getEmployeesInfiniteListOffset(state as StateSchema)).toEqual(
            10,
        );
    });

    test("Should return default offset (0) for empty state", () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getEmployeesInfiniteListOffset(state as StateSchema)).toEqual(0);
    });
});
