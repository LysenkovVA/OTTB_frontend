import { FC, lazy } from "react";
import { DepartmentsPageProps } from "./DepartmentsPage";

export const DepartmentsPageAsync = lazy<FC<DepartmentsPageProps>>(() => {
    return import("./DepartmentsPage");
});
