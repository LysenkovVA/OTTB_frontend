import { Workspace } from "@/entities/Workspace";
import { User } from "./User";

export interface UserSchema {
    // Авторизованный пользователь
    authenticatedUser?: User;
    activeWorkspace?: Workspace;
    // Только что зарегистрированный пользователь
    registeredUserId?: string;
    isLoading?: boolean;
    error?: string;
    _isInitialized?: boolean;
}
