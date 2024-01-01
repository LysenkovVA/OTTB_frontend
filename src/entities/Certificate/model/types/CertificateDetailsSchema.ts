import { Certificate } from "@/entities/Certificate";

export interface CertificateDetailsSchema {
    isLoading?: boolean;
    error?: string;
    certificateDetails?: Certificate;
    certificateDetailsForm?: Certificate;
    _isInitialized?: boolean;
}
