import { lazy } from "react";

export const OrganizationDetailsPageAsync = lazy(
    () => import("./OrganizationDetailsPage"),
);
