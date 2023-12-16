import { EmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList";
import { getEmployeesInfiniteListSearchQuery } from "@/features/Employees/employeesInfiniteList/model/selectors/employeesInfiniteListSelectors";
import { fetchEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/fetchEmployeesInfiniteList/fetchEmployeesInfiniteList";
import { employeesInfiniteListActions } from "@/features/Employees/employeesInfiniteList/model/slice/employeesInfiniteListSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Flex } from "antd";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

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

    return (
        <Flex vertical gap={8}>
            <EmployeesInfiniteList />
        </Flex>
    );
};

export default memo(EmployeesPage);
