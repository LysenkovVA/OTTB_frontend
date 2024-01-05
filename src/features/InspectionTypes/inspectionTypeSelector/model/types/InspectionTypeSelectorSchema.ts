import { BerthType } from "@/entities/BerthType";
import { EntityState } from "@reduxjs/toolkit";
import { InspectionType } from "@/entities/InspectionType";

export interface InspectionTypeSelectorSchema extends EntityState<InspectionType> {
    isLoading?: boolean;
    error?: string;
    _isInitialized: boolean;
}
