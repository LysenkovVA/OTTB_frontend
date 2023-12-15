import { FC, lazy } from "react";
import { InspectionsPageProps } from "./InspectionsPage";

export const InspectionsPageAsync = lazy<FC<InspectionsPageProps>>(() => {
    return import("./InspectionsPage");
});
