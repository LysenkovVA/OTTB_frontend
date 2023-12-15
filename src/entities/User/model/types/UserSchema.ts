import { User } from "./User";

export interface UserSchema {
    // Авторизованный пользователь
    authenticatedUser?: User;
    // avatar?: string;
    // Только что зарегистрированный пользователь
    registeredUserId?: string;
    isLoading?: boolean;
    error?: string;
    // isAvatarLoading?: boolean;
    // avatarError?: string;
    _isInitialized?: boolean;
    // _isAvatarInitialized?: boolean;
}
