import { FC, lazy } from "react";
import { ConstructionObjectsPageProps } from "./ConstructionObjectsPage";

export const ConstructionObjectsPageAsync = lazy<
    FC<ConstructionObjectsPageProps>
>(() => {
    return import("./ConstructionObjectsPage");
});
