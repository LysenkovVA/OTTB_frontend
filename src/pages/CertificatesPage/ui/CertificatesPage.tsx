import { CertificatesInfiniteList } from "@/features/Certificates/certificatesInfiniteList";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { ListWrapper } from "@/shared/ui/ListWrapper";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface CertificatesPageProps {
    className?: string;
}

const CertificatesPage = (props: CertificatesPageProps) => {
    const { className } = props;

    const navigate = useNavigate();

    const onAddClick = useCallback(() => {
        navigate(RoutePath.create_certificate);
    }, [navigate]);

    return (
        <ListWrapper title={"Удостоверения"} onAddClick={onAddClick}>
            <CertificatesInfiniteList />
        </ListWrapper>
    );
};

export default memo(CertificatesPage);
