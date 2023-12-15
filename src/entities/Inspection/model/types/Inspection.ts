import { ConstructionObject } from "@/entities/ConstructionObject";
import { InspectionType } from "@/entities/InspectionType";
import { ResultDocumentType } from "@/entities/ResultDocumentType";

export interface Inspection {
    id: string;
    date?: Date;
    isPenalty?: boolean;
    isCommitional?: boolean;
    dateOfElimination?: Date;
    documentNumber?: string;
    documentDate?: Date;
    notes?: string;
    constructionObject?: ConstructionObject;
    inspectionType?: InspectionType;
    resultDocumentType?: ResultDocumentType;
}
