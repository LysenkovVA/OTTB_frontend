import { InspectionType } from "@/entities/InspectionType";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const inspectionTypesSelectorAdapter =
    createEntityAdapter<InspectionType>({
        selectId: (inspectionType) => inspectionType.id,
    });
