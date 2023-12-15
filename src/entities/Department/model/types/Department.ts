import { Organization } from "@/entities/Organization";

export interface Department {
    id: string;
    name: string;
    organization: Organization;
}
