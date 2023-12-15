import { Berth } from "@/entities/Berth";
import { Certificate } from "@/entities/Certificate";
import { Department } from "@/entities/Department";
import { File } from "@/entities/File";

export interface Employee {
    id?: string;
    avatar?: File;
    surname?: string;
    name?: string;
    hireDate?: string;
    dismissDate?: string;
    rank?: string;
    phone?: string;
    email?: string;
    berth?: Berth;
    department?: Department;
    certificates?: Certificate[];
}
