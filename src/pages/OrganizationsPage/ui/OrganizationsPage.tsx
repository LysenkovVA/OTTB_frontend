import { OrganizationsInfiniteList } from "@/features/Organizations/organizationsInfiniteList";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { ListWrapper } from "@/shared/ui/ListWrapper";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface OrganizationsPageProps {
    className?: string;
}

const OrganizationsPage = (props: OrganizationsPageProps) => {
    const { className } = props;

    const navigate = useNavigate();

    const onAddClick = useCallback(() => {
        navigate(RoutePath.create_organization);
    }, [navigate]);

    return (
        <ListWrapper title={"Организации"} onAddClick={onAddClick}>
            <OrganizationsInfiniteList />
        </ListWrapper>
    );
};

export default memo(OrganizationsPage);
