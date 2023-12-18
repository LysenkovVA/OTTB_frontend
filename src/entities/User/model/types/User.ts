import { Profile } from "@/entities/Profile/model/types/Profile";
import { Role } from "@/entities/Role";
import { Subscription } from "@/entities/Subscription";
import { Workspace } from "@/entities/Workspace";

export interface User {
    id?: string;
    email?: string;
    profile?: Profile;
    workspaces?: Workspace[];
    roles?: Role[];
    subscriptions?: Subscription[];
}
