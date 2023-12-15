import { Organization } from "@/entities/Organization";
import { EntityState } from "@reduxjs/toolkit";

export interface AllOrganizationsSchema extends EntityState<Organization> {
    isLoading?: boolean;
    error?: string;
    _isInitialized: boolean;
}
