import { Employee } from "@/entities/Employee";
import { Organization } from "@/entities/Organization";

export interface EmployeeDetailsSchema {
    isDataLoading?: boolean;
    dataError?: string;
    employeeDetails?: Employee;
    employeeDetailsForm?: Employee;
    dataChanged?: boolean;
    avatarChanged?: boolean;
    employeeDetailsFormSelectedOrganization?: Organization;
    employeeDetailsFormAvatar?: string;
    _isInitialized?: boolean;
}
