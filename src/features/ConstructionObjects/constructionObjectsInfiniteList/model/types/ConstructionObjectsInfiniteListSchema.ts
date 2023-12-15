import { ConstructionObject } from "@/entities/ConstructionObject/model/types/ConstructionObject";
import { EntityState } from "@reduxjs/toolkit";

export interface ConstructionObjectsInfiniteListSchema
    extends EntityState<ConstructionObject> {
    isLoading?: boolean;
    error?: string;
    limit: number;
    offset: number;
    hasMore: boolean;
    _isInitialized: boolean;
}
