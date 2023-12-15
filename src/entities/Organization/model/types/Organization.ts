import { ConstructionObject } from "@/entities/ConstructionObject";
import { Department } from "@/entities/Department";

export interface Organization {
    id: string;
    name: string;
    departments?: Department[];
    constructionObjects?: ConstructionObject[];
}
