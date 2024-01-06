import { Workspace } from "@/entities/Workspace";

export interface ConstructionObject {
    id: string;
    name: string;
    address?: string;
    startDate?: Date;
    endDate?: Date;
    workspace?: Workspace;
}
