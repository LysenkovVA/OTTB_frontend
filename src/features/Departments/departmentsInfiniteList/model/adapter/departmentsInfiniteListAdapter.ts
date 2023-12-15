import { Department } from "@/entities/Department";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const departmentsInfiniteListAdapter = createEntityAdapter<Department>({
    selectId: (department) => department.id,
});
