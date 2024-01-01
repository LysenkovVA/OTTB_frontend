import { CertificateType } from "@/entities/CertificateType";

export interface CertificateTypeDetailsSchema {
    isLoading?: boolean;
    error?: string;
    certificateTypeDetails?: CertificateType;
    certificateTypeDetailsForm?: CertificateType;
    _isInitialized?: boolean;
}
