import { lazy } from "react";

export const EmployeeDetailsPageAsync = lazy(
    () => import("./EmployeeDetailsPage"),
);
