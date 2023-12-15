import { lazy } from "react";

export const CreateDepartmentPageAsync = lazy(
    () => import("./CreateDepartmentPage"),
);
