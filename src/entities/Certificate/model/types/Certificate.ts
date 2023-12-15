import { CertificateType } from "@/entities/CertificateType";
import { Employee } from "@/entities/Employee";
import { File } from "@/entities/File";

export interface Certificate {
    id: string;
    number?: string;
    startDate?: Date;
    group?: string;
    certificateType?: CertificateType;
    employee?: Employee;
    scans?: File[];
    protocols?: File[];
}
