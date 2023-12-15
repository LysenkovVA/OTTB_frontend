import { lazy } from "react";

export const CreateOrganizationPageAsync = lazy(
    () => import("./CreateOrganizationPage"),
);
