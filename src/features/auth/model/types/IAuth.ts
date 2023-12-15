import { User } from "@/entities/User";

export interface IAuth {
    user: User;
    accessToken: string;
    refreshToken: string;
}
