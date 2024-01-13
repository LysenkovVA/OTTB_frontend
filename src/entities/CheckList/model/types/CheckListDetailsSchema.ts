import { CheckList } from "@/entities/CheckList/model/types/CheckList";

export interface CheckListDetailsSchema {
    isLoading?: boolean;
    isUpdating?: boolean;
    error?: string;
    checkListDetails: CheckList;
    checkListDetailsForm: CheckList;
    _isInitialized?: boolean;
}
