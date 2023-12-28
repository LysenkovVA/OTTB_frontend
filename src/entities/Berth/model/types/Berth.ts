import { BerthType } from "@/entities/BerthType";

export interface Berth {
    id: string;
    value: string;
    hasRank: boolean;
    berthType?: BerthType;
}
