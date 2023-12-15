import { Organization } from "@/entities/Organization";

export interface ConstructionObject {
    id: string;
    name: string;
    address?: string;
    startDate?: Date;
    endDate?: Date;
    organization?: Organization;
}
