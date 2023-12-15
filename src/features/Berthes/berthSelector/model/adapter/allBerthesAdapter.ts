import { Berth } from "@/entities/Berth";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const allBerthesAdapter = createEntityAdapter<Berth>({
    selectId: (berth) => berth.id,
});
