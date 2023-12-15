import { lazy } from "react";

export const CreateInspectionPageAsync = lazy(
    () => import("./CreateInspectionPage"),
);
