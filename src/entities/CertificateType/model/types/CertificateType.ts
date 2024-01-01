export interface CertificateType {
    id: string;
    value: string;
    hasGroups?: boolean;
    isUnlimited?: boolean;
    durationAtMonths?: number;
}
