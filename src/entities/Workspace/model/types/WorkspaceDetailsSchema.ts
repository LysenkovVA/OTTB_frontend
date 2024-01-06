import { Workspace } from "@/entities/Workspace";

export interface WorkspaceDetailsSchema {
    isLoading?: boolean;
    error?: string;
    workspaceDetails?: Workspace;
    workspaceDetailsForm?: Workspace;
    _isInitialized?: boolean;
}
