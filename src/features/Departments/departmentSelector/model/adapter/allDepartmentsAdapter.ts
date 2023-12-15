import { Department } from "@/entities/Department";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const allDepartmentsAdapter = createEntityAdapter<Department>({
    selectId: (department) => department.id,
});
