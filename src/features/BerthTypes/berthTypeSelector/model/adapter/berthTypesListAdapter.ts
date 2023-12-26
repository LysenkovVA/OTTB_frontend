import { BerthType } from "@/entities/BerthType";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const berthTypesListAdapter = createEntityAdapter<BerthType>({
    selectId: (berthType) => berthType.id,
});
