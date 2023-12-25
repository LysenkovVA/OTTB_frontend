import { fetchEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/fetchEmployeesInfiniteList/fetchEmployeesInfiniteList";
import { initializeEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/initializeEmployeesInfiniteList/initializeEmployeesInfiniteList";
import EmployeeItem from "@/features/Employees/employeesInfiniteList/ui/EmployeeItem/EmployeeItem";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { InfiniteScrollPage } from "@/shared/ui/InfiniteScrollPage";
import { Col, Empty, Flex, Row } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    getEmployeeListsHasMore,
    getEmployeesInfiniteList,
    getEmployeesInfiniteListError,
    getEmployeesInfiniteListIsInitialized,
    getEmployeesInfiniteListIsLoading,
    getEmployeesInfiniteListLimit,
    getEmployeesInfiniteListOffset,
} from "../../model/selectors/employeesInfiniteListSelectors";
import {
    employeesInfiniteListActions,
    employeesInfiniteListReducer,
} from "../../model/slice/employeesInfiniteListSlice";

interface EmployeesInfiniteListProps {
    className?: string;
}

const initialReducers: ReducersList = {
    employeesInfiniteListSchema: employeesInfiniteListReducer,
};

export const EmployeesInfiniteList = memo(
    (props: EmployeesInfiniteListProps) => {
        const { className } = props;

        // Получаем параметры из строки запроса
        const [searchParams] = useSearchParams();
        const navigate = useNavigate();

        const dispatch = useAppDispatch();

        const employees = useSelector(getEmployeesInfiniteList.selectAll);
        const isLoading = useSelector(getEmployeesInfiniteListIsLoading);
        const error = useSelector(getEmployeesInfiniteListError);
        const limit = useSelector(getEmployeesInfiniteListLimit);
        const offset = useSelector(getEmployeesInfiniteListOffset);
        const hasMore = useSelector(getEmployeeListsHasMore);
        const isInitialized = useSelector(
            getEmployeesInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(initializeEmployeesInfiniteList(searchParams));
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    employeesInfiniteListActions.setOffset(limit + offset),
                );
                dispatch(fetchEmployeesInfiniteList({ replaceData: false }));
            }
        }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

        const onClick = useCallback(
            (id: string | undefined) => {
                if (id) {
                    navigate(RoutePath.employee_details + id);
                }
            },
            [navigate],
        );

        const skeletons = useMemo(() => {
            const skeletons = [];

            for (let i = 0; i < limit; i++) {
                skeletons.push(
                    <Col key={i} span={24 / 4}>
                        <EmployeeItem
                            key={i}
                            employee={{ id: "0" }}
                            isLoading={true}
                        />
                    </Col>,
                );
            }

            return <Row gutter={[0, 0]}>{skeletons}</Row>;
        }, [limit]);

        const content = useMemo(() => {
            return (
                <Row gutter={[0, 0]}>
                    {employees.map((employee, index) => (
                        <Col key={index} span={24 / 4}>
                            <EmployeeItem
                                key={employee.id}
                                employee={employee}
                                onClick={onClick}
                            />
                        </Col>
                    ))}
                </Row>
            );
        }, [employees, onClick]);

        return (
            <DynamicModuleLoader
                reducers={initialReducers}
                removeAfterUnmount={false}
            >
                {!isLoading && error && (
                    <ErrorInfo status={"error"} title={error} subtitle={""} />
                )}
                <InfiniteScrollPage onScrollEnd={onLoadNextPart}>
                    <Flex vertical gap={8}>
                        {content}
                        {isLoading && skeletons}
                    </Flex>
                    {!isLoading &&
                        !error &&
                        employees &&
                        employees?.length === 0 && (
                            <Empty description={"Сотрудников не найдено"} />
                        )}
                </InfiniteScrollPage>
            </DynamicModuleLoader>
        );
    },
);
