import { Certificate } from "@/entities/Certificate";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const certificatesInfiniteListAdapter = createEntityAdapter<Certificate>(
    {
        selectId: (certificate) => certificate.id,
    },
);
