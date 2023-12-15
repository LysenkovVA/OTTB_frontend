import {
    employeesInfiniteListActions,
    employeesInfiniteListReducer,
} from "@/features/Employees/employeesInfiniteList/model/slice/employeesInfiniteListSlice";
import { EmployeesInfiniteListSchema } from "src/features/Employees/employeesInfiniteList";

describe("employeePageSlice.test", () => {
    test("Should set initialized", () => {
        const state: DeepPartial<EmployeesInfiniteListSchema> = {
            _isInitialized: false,
        };
        expect(
            employeesInfiniteListReducer(
                state as EmployeesInfiniteListSchema,
                employeesInfiniteListActions.initializeState(),
            ),
        ).toEqual({ _isInitialized: true });
    });

    test("Should set limit", () => {
        const state: DeepPartial<EmployeesInfiniteListSchema> = {
            limit: 10,
        };

        expect(
            employeesInfiniteListReducer(
                state as EmployeesInfiniteListSchema,
                employeesInfiniteListActions.setLimit(5),
            ),
        ).toEqual({ limit: 5 });
    });

    test("Should set offset", () => {
        const state: DeepPartial<EmployeesInfiniteListSchema> = {
            offset: 0,
        };

        expect(
            employeesInfiniteListReducer(
                state as EmployeesInfiniteListSchema,
                employeesInfiniteListActions.setOffset(10),
            ),
        ).toEqual({ offset: 10 });
    });

    test("Should set search query", () => {
        const state: DeepPartial<EmployeesInfiniteListSchema> = {
            searchQuery: "",
            offset: 10,
        };

        expect(
            employeesInfiniteListReducer(
                state as EmployeesInfiniteListSchema,
                employeesInfiniteListActions.setSearchQuery("search"),
            ),
        ).toEqual({ searchQuery: "search", offset: 0 });
    });
});
