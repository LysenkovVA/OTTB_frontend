import { File } from "@/entities/File";

export interface Workspace {
    id: string;
    name: string;
    organizationLogo?: File;
    organizationName?: string;
    organizationAddress?: string;
    organizationPhone?: string;
    organizationEmail?: string;
    organizationWeb?: string;
    organizationINN?: string;
    organizationKPP?: string;
    organizationBank?: string;
    organizationRS?: string;
    organizationKS?: string;
    organizationBIK?: string;
    organizationOKPO?: string;
    organizationOKVED?: string;
    organizationOGRN?: string;
}
