import { Department } from "@/entities/Department";
import { EntityState } from "@reduxjs/toolkit";

export interface AllDepartmentsSchema extends EntityState<Department> {
    isLoading?: boolean;
    error?: string;
    _isInitialized: boolean;
}
