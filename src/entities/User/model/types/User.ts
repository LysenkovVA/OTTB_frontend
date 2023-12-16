import { Profile } from "@/entities/Profile/model/types/Profile";

export interface User {
    id?: string;
    email?: string;
    profile?: Profile;
    // TODO Roles
    // TODO Subscriptions
}
