import { Workspace } from "@/entities/Workspace";

export interface Department {
    id: string;
    name: string;
    workspace?: Workspace;
}
