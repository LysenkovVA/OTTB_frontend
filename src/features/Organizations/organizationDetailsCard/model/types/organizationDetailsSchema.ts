import { Organization } from "@/entities/Organization";

export interface OrganizationDetailsSchema {
    isLoading?: boolean;
    error?: string;
    organizationDetails?: Organization;
    organizationDetailsForm?: Organization;
    _isInitialized?: boolean;
}
