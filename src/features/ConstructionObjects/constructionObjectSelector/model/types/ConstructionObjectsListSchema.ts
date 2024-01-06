import { ConstructionObject } from "@/entities/ConstructionObject";
import { EntityState } from "@reduxjs/toolkit";

export interface ConstructionObjectsListSchema
    extends EntityState<ConstructionObject> {
    isLoading?: boolean;
    error?: string;
    _isInitialized: boolean;
}
