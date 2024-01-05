import { InspectionType } from "@/entities/InspectionType";

export interface InspectionTypeDetailsSchema {
    isLoading?: boolean;
    error?: string;
    inspectionTypeDetails?: InspectionType;
    inspectionTypeDetailsForm?: InspectionType;
    _isInitialized?: boolean;
}
