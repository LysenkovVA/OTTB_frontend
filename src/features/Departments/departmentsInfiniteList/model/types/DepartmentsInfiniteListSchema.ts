import { Department } from "@/entities/Department";
import { EntityState } from "@reduxjs/toolkit";

export interface DepartmentsInfiniteListSchema extends EntityState<Department> {
    isLoading?: boolean;
    error?: string;
    limit: number;
    offset: number;
    hasMore: boolean;
    _isInitialized: boolean;
}
