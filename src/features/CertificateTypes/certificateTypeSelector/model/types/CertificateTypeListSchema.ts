import { CertificateType } from "@/entities/CertificateType";
import { EntityState } from "@reduxjs/toolkit";

export interface CertificateTypeListSchema
    extends EntityState<CertificateType> {
    isLoading?: boolean;
    error?: string;
    _isInitialized: boolean;
}
