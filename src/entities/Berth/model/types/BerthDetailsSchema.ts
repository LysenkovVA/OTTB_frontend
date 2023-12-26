import { Berth } from "@/entities/Berth";

export interface BerthDetailsSchema {
    isLoading?: boolean;
    error?: string;
    berthDetails?: Berth;
    berthDetailsForm?: Berth;
    _isInitialized?: boolean;
}
