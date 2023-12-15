import { Employee } from "@/entities/Employee";

export interface EmployeeDetailsSchema {
    isDataLoading?: boolean;
    dataError?: string;
    employeeDetails?: Employee;
    employeeDetailsForm?: Employee;
    isAvatarUploading?: boolean;
    avatarUploadError?: string;
    employeeDetailsFormAvatar?: string;
    removeAvatarOnUpdate?: boolean;
    _isInitialized?: boolean;
}
