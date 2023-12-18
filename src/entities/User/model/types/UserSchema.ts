import { User } from "./User";

export interface UserSchema {
    // Авторизованный пользователь
    authenticatedUser?: User;
    activeWorkspaceId?: string;
    // Только что зарегистрированный пользователь
    registeredUserId?: string;
    isLoading?: boolean;
    error?: string;
    _isInitialized?: boolean;
}
