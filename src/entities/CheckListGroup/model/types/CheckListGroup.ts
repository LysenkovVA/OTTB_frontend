import { Check } from "@/entities/Check";

export interface CheckListGroup {
    id: string;
    value: string;
    checks?: Check[];
}
