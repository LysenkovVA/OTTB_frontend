import { StateSchema } from "@/app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

export const getUIScrollSchema = (state: StateSchema) => state.ui.scroll;

export const getUIScrollByPath = createSelector(
    getUIScrollSchema,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
