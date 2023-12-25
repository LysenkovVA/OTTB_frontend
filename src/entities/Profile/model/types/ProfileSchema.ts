import { Profile } from "@/entities/Profile/model/types/Profile";

export interface ProfileSchema {
    isDataLoading?: boolean;
    dataError?: string;
    profileData?: Profile;
    profileFormData?: Profile;
    profileFormDataAvatar?: string;
    _isDataInitialized: boolean;
}
