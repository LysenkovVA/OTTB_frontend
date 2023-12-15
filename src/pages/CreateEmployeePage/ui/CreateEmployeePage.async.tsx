import { lazy } from "react";

export const CreateEmployeePageAsync = lazy(
    () => import("./CreateEmployeePage"),
);
