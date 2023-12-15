import { File } from "@/entities/File";
import { User } from "@/entities/User";

export interface Profile {
    id?: string;
    surname?: string;
    name?: string;
    patronymic?: string;
    birthDate?: string;
    avatar?: File;
    user?: User;
}
