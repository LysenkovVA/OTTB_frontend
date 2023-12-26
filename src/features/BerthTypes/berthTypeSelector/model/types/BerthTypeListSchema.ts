import { BerthType } from "@/entities/BerthType";
import { EntityState } from "@reduxjs/toolkit";

export interface BerthTypeListSchema extends EntityState<BerthType> {
    isLoading?: boolean;
    error?: string;
    _isInitialized: boolean;
}
