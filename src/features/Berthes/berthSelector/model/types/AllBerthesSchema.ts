import { Berth } from "@/entities/Berth";
import { EntityState } from "@reduxjs/toolkit";

export interface AllBerthesSchema extends EntityState<Berth> {
    isLoading?: boolean;
    error?: string;
    // limit: number;
    // offset: number;
    // searchQuery?: string;
    // hasMore: boolean;
    _isInitialized: boolean;
}
