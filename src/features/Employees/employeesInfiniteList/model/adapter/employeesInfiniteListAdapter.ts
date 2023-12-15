import { Employee } from "@/entities/Employee";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const employeesInfiniteListAdapter = createEntityAdapter<Employee>({
    selectId: (employee) => employee.id!,
});
