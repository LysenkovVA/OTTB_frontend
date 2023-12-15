import { StateSchema } from "@/app/providers/StoreProvider";

import { employeesInfiniteListAdapter } from "../../adapter/employeesInfiniteListAdapter";

export const getEmployeesInfiniteList =
    employeesInfiniteListAdapter.getSelectors<StateSchema>(
        (state) =>
            state.employeesInfiniteListSchema ??
            employeesInfiniteListAdapter.getInitialState(),
    );
