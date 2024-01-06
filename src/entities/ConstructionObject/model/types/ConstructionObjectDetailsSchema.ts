import { ConstructionObject } from "@/entities/ConstructionObject";

export interface ConstructionObjectDetailsSchema {
    isLoading?: boolean;
    error?: string;
    constructionObjectDetails?: ConstructionObject;
    constructionObjectDetailsForm?: ConstructionObject;
    _isInitialized?: boolean;
}
