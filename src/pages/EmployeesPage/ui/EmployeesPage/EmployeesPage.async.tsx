import { FC, lazy } from "react";
import { EmployeesPageProps } from "./EmployeesPage";

export const EmployeesPageAsync = lazy<FC<EmployeesPageProps>>(() => {
    return import("./EmployeesPage");
});
