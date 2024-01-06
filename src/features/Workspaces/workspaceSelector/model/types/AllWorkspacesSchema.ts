import { Workspace } from "@/entities/Workspace";
import { EntityState } from "@reduxjs/toolkit";

export interface AllWorkspacesSchema extends EntityState<Workspace> {
    isLoading?: boolean;
    error?: string;
    _isInitialized: boolean;
}
