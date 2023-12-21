import { DepartmentsInfiniteList } from "@/features/Departments/departmentsInfiniteList";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { ListWrapper } from "@/shared/ui/ListWrapper";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface DepartmentsPageProps {
    className?: string;
}

const DepartmentsPage = (props: DepartmentsPageProps) => {
    const { className } = props;

    const navigate = useNavigate();

    const onAddClick = useCallback(() => {
        navigate(RoutePath.create_department);
    }, [navigate]);

    return (
        <ListWrapper title={"Подразделения"} onAddClick={onAddClick}>
            <DepartmentsInfiniteList />
        </ListWrapper>
    );
};

export default memo(DepartmentsPage);
