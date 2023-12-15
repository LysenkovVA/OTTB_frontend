import { FC, lazy } from "react";
import { CertificatesPageProps } from "./CertificatesPage";

export const CertificatesPageAsync = lazy<FC<CertificatesPageProps>>(() => {
    return import("./CertificatesPage");
});
