import { InspectionsInfiniteList } from "@/features/Inspections/inspectionsInfiniteList";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { ListWrapper } from "@/shared/ui/ListWrapper";
import { PageWrapper } from "@/widgets/PageWrapper";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface InspectionsPageProps {
    className?: string;
}

const InspectionsPage = (props: InspectionsPageProps) => {
    const { className } = props;

    const navigate = useNavigate();

    const onAddClick = useCallback(() => {
        navigate(RoutePath.create_inspection);
    }, [navigate]);

    return (
        <PageWrapper>
            <ListWrapper title={"Проверки"} onAddClick={onAddClick}>
                <InspectionsInfiniteList />
            </ListWrapper>
        </PageWrapper>
    );
};

export default memo(InspectionsPage);
