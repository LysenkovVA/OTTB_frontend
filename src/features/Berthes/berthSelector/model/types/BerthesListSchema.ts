import { Berth } from "@/entities/Berth";
import { EntityState } from "@reduxjs/toolkit";

export interface BerthesListSchema extends EntityState<Berth> {
    isLoading?: boolean;
    error?: string;
    _isInitialized: boolean;
}
