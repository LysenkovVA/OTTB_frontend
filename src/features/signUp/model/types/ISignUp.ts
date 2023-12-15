import { User } from "@/entities/User";

export interface ISignUp {
    user: User;
    accessToken: string;
    refreshToken: string;
}
