import { ConstructionObjectsInfiniteList } from "@/features/ConstructionObjects/constructionObjectsInfiniteList";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { ListWrapper } from "@/shared/ui/ListWrapper";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface ConstructionObjectsPageProps {
    className?: string;
}

const ConstructionObjectsPage = (props: ConstructionObjectsPageProps) => {
    const { className } = props;

    const navigate = useNavigate();

    const onAddClick = useCallback(() => {
        navigate(RoutePath.create_object);
    }, [navigate]);

    return (
        <ListWrapper title={"Объекты"} onAddClick={onAddClick}>
            <ConstructionObjectsInfiniteList />
        </ListWrapper>
    );
};

export default memo(ConstructionObjectsPage);
