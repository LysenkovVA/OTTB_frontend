import { Workspace } from "@/entities/Workspace";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const allWorkspacesAdapter = createEntityAdapter<Workspace>({
    selectId: (entity) => entity.id,
});
