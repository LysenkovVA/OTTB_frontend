import { Employee } from "@/entities/Employee";
import { Organization } from "@/entities/Organization";

export interface EmployeeDetailsSchema {
    isDataLoading?: boolean;
    dataError?: string;
    employeeDetails?: Employee;
    employeeDetailsForm?: Employee;
    employeeDetailsFormSelectedOrganization?: Organization;
    isAvatarUploading?: boolean;
    avatarUploadError?: string;
    employeeDetailsFormAvatar?: string;
    removeAvatarOnUpdate?: boolean;
    _isInitialized?: boolean;
}
