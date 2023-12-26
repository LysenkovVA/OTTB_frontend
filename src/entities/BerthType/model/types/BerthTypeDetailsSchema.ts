import { BerthType } from "@/entities/BerthType";

export interface BerthTypeDetailsSchema {
    isLoading?: boolean;
    error?: string;
    berthTypeDetails?: BerthType;
    berthTypeDetailsForm?: BerthType;
    _isInitialized?: boolean;
}
