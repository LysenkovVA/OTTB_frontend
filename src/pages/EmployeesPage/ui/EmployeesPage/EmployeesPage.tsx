import { EmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList";
import { getEmployeesInfiniteListSearchQuery } from "@/features/Employees/employeesInfiniteList/model/selectors/employeesInfiniteListSelectors";
import { fetchEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/fetchEmployeesInfiniteList/fetchEmployeesInfiniteList";
import { employeesInfiniteListActions } from "@/features/Employees/employeesInfiniteList/model/slice/employeesInfiniteListSlice";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ListWrapper } from "@/shared/ui/ListWrapper";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export interface EmployeesPageProps {
    className?: string;
}

const EmployeesPage = (props: EmployeesPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const searchQuery = useSelector(getEmployeesInfiniteListSearchQuery);

    const fetchData = useCallback(() => {
        dispatch(fetchEmployeesInfiniteList({ replaceData: true }));
    }, [dispatch]);

    const onChange = useCallback(
        (value: string | undefined) => {
            dispatch(employeesInfiniteListActions.setSearchQuery(value));
        },
        [dispatch],
    );

    const navigate = useNavigate();

    const onAddClick = useCallback(() => {
        navigate(RoutePath.create_employee);
    }, [navigate]);

    return (
        <ListWrapper title={"Сотрудники"} onAddClick={onAddClick}>
            <EmployeesInfiniteList />
        </ListWrapper>
    );
};

export default memo(EmployeesPage);
