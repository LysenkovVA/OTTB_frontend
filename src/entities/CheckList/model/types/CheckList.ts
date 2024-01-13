import { CheckListGroup } from "@/entities/CheckListGroup";
import { Workspace } from "@/entities/Workspace";

export interface CheckList {
    id: string;
    name: string;
    description?: string;
    checkListGroups?: CheckListGroup[];
    workspace?: Workspace;
}
