import { Employee } from "@/entities/Employee";

export interface EmployeeDetailsSchema {
    isDataLoading?: boolean;
    dataError?: string;
    employeeDetails?: Employee;
    employeeDetailsForm?: Employee;
    dataChanged?: boolean;
    avatarChanged?: boolean;
    employeeDetailsFormAvatar?: string;
    _isInitialized?: boolean;
}
