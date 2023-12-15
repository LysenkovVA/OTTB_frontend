import { FC, lazy } from "react";
import { NotFoundPageProps } from "./NotFoundPage";

export const NotFoundPageAsync = lazy<FC<NotFoundPageProps>>(
    async () => await import("./NotFoundPage"),
);
