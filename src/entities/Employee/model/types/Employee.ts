import { Berth } from "@/entities/Berth";
import { Certificate } from "@/entities/Certificate";
import { Department } from "@/entities/Department";
import { File } from "@/entities/File";
import { Workspace } from "@/entities/Workspace";

export interface Employee {
    id?: string;
    surname?: string;
    name?: string;
    phone?: string;
    email?: string;
    hireDate?: string;
    dismissDate?: string;
    workspace?: Workspace;
    avatar?: File;
    department?: Department;
    berth?: Berth;
    rank?: string;
    certificates?: Certificate[];
}
