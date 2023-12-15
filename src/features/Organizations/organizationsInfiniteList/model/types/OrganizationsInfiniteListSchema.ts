import { Organization } from "@/entities/Organization/model/types/Organization";
import { EntityState } from "@reduxjs/toolkit";

export interface OrganizationsInfiniteListSchema
    extends EntityState<Organization> {
    isLoading?: boolean;
    error?: string;
    limit: number;
    offset: number;
    hasMore: boolean;
    _isInitialized: boolean;
}
