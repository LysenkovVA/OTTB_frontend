import { CertificateType } from "@/entities/CertificateType";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const certificateTypesListAdapter = createEntityAdapter<CertificateType>(
    {
        selectId: (certificateType) => certificateType.id,
    },
);
