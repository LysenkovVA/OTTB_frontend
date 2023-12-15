import { Inspection } from "@/entities/Inspection/model/types/Inspection";
import { EntityState } from "@reduxjs/toolkit";

export interface InspectionsInfiniteListSchema extends EntityState<Inspection> {
    isLoading?: boolean;
    error?: string;
    limit: number;
    offset: number;
    hasMore: boolean;
    _isInitialized: boolean;
}
