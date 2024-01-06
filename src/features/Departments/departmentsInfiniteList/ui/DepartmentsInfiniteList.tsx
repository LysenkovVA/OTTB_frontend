import { DepartmentCard } from "@/entities/Department";
import { fetchDepartmentsInfiniteList } from "@/features/Departments/departmentsInfiniteList/model/services/fetchDepartmentsInfiniteList/fetchDepartmentsInfiniteList";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { InfiniteScrollPage } from "@/shared/ui/InfiniteScrollPage";
import { Empty, Flex } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getDepartmentsInfiniteList,
    getDepartmentsInfiniteListError,
    getDepartmentsInfiniteListHasMore,
    getDepartmentsInfiniteListIsInitialized,
    getDepartmentsInfiniteListIsLoading,
    getDepartmentsInfiniteListLimit,
    getDepartmentsInfiniteListOffset,
} from "../model/selectors/departmentsInfiniteListSelectors";
import {
    departmentsInfiniteListActions,
    departmentsInfiniteListReducer,
} from "../model/slice/departmentsInfiniteListSlice";

interface DepartmentsInfiniteListProps {
    className?: string;
}

const reducers: ReducersList = {
    departmentsInfiniteListSchema: departmentsInfiniteListReducer,
};

export const DepartmentsInfiniteList = memo(
    (props: DepartmentsInfiniteListProps) => {
        const { className } = props;

        const navigate = useNavigate();

        const dispatch = useAppDispatch();
        const departments = useSelector(getDepartmentsInfiniteList.selectAll);
        const isLoading = useSelector(getDepartmentsInfiniteListIsLoading);
        const error = useSelector(getDepartmentsInfiniteListError);
        const limit = useSelector(getDepartmentsInfiniteListLimit);
        const offset = useSelector(getDepartmentsInfiniteListOffset);
        const hasMore = useSelector(getDepartmentsInfiniteListHasMore);
        const isInitialized = useSelector(
            getDepartmentsInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(fetchDepartmentsInfiniteList({ replaceData: true }));
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    departmentsInfiniteListActions.setOffset(limit + offset),
                );
                dispatch(fetchDepartmentsInfiniteList({ replaceData: false }));
            }
        }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

        const skeletons = useMemo(() => {
            const skeletons = [];

            for (let i = 0; i < limit; i++) {
                skeletons.push(
                    <DepartmentCard
                        key={i}
                        department={{
                            id: "0",
                            name: "",
                            workspace: { id: "1", name: "ССТ-М" },
                        }}
                        isLoading={true}
                    />,
                );
            }

            return skeletons;
        }, [limit]);

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
                {!isLoading && error && (
                    <ErrorInfo status={"error"} title={error} subtitle={""} />
                )}
                <InfiniteScrollPage onScrollEnd={onLoadNextPart}>
                    <Flex vertical gap={8}>
                        {departments?.map((department) => (
                            <DepartmentCard
                                key={department.id}
                                department={department}
                            />
                        ))}
                        {isLoading && (
                            <Flex vertical gap={8}>
                                {skeletons}
                            </Flex>
                        )}
                    </Flex>
                    {!isLoading &&
                        !error &&
                        departments &&
                        departments?.length === 0 && (
                            <Empty description={"Участков не найдено"} />
                        )}
                </InfiniteScrollPage>
            </DynamicModuleLoader>
        );
    },
);
