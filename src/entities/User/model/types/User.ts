import { Profile } from "@/entities/Profile/model/types/Profile";

export interface User {
    id?: string;
    email?: string;
    // token?: string;
    profile?: Profile;
}
