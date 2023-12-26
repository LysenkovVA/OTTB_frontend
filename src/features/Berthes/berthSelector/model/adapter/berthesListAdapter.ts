import { Berth } from "@/entities/Berth";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const berthesListAdapter = createEntityAdapter<Berth>({
    selectId: (berth) => berth.id,
});
