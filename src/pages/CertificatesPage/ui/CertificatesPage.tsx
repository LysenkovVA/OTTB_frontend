import { CertificatesInfiniteList } from "@/features/Certificates/certificatesInfiniteList";
import { memo } from "react";

export interface CertificatesPageProps {
    className?: string;
}

const CertificatesPage = (props: CertificatesPageProps) => {
    const { className } = props;

    return <CertificatesInfiniteList />;
};

export default memo(CertificatesPage);
