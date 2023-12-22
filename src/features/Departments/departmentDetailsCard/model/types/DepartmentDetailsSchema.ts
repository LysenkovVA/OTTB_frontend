import { Department } from "@/entities/Department";

export interface DepartmentDetailsSchema {
    isDataLoading?: boolean;
    dataError?: string;
    departmentDetails?: Department;
    departmentDetailsForm?: Department;
    _isInitialized?: boolean;
}
