import { Inspection } from "@/entities/Inspection";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const inspectionsInfiniteListAdapter = createEntityAdapter<Inspection>({
    selectId: (inspection) => inspection.id,
});
