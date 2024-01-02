import { Inspection } from "@/entities/Inspection";

export interface InspectionDetailsSchema {
    isLoading?: boolean;
    error?: string;
    inspectionDetails?: Inspection;
    inspectionDetailsForm?: Inspection;
    _isInitialized?: boolean;
}
