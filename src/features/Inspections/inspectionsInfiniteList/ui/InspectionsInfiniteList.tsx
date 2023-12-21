import { InspectionItem } from "@/entities/Inspection";
import { fetchInspectionsInfiniteList } from "@/features/Inspections/inspectionsInfiniteList/model/services/fetchInspectionsInfiniteList/fetchInspectionsInfiniteList";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { InfiniteScrollPage } from "@/widgets/InfiniteScrollPage";
import { Empty, Flex } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
    getInspectionInfiniteListOffset,
    getInspectionsInfiniteList,
    getInspectionsInfiniteListError,
    getInspectionsInfiniteListHasMore,
    getInspectionsInfiniteListIsInitialized,
    getInspectionsInfiniteListIsLoading,
    getInspectionsInfiniteListLimit,
} from "../model/selectors/inspectionsInfiniteListSelectors";
import {
    inspectionsInfiniteListActions,
    inspectionsInfiniteListReducer,
} from "../model/slice/inspectionsInfiniteListSlice";

interface InspectionsInfiniteListProps {
    className?: string;
}

const reducers: ReducersList = {
    inspectionsInfiniteListSchema: inspectionsInfiniteListReducer,
};

export const InspectionsInfiniteList = memo(
    (props: InspectionsInfiniteListProps) => {
        const { className } = props;

        const dispatch = useAppDispatch();

        const inspections = useSelector(getInspectionsInfiniteList.selectAll);
        const isLoading = useSelector(getInspectionsInfiniteListIsLoading);
        const limit = useSelector(getInspectionsInfiniteListLimit);
        const offset = useSelector(getInspectionInfiniteListOffset);
        const error = useSelector(getInspectionsInfiniteListError);
        const hasMore = useSelector(getInspectionsInfiniteListHasMore);
        const isInitialized = useSelector(
            getInspectionsInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(fetchInspectionsInfiniteList({ replaceData: true }));
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    inspectionsInfiniteListActions.setOffset(limit + offset),
                );
                dispatch(fetchInspectionsInfiniteList({ replaceData: false }));
            }
        }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

        const skeletons = useMemo(() => {
            const skeletons = [];

            for (let i = 0; i < limit; i++) {
                skeletons.push(
                    <InspectionItem
                        key={i}
                        inspection={{ id: "0" }}
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
                        {inspections?.map((inspection) => (
                            <InspectionItem
                                key={inspection.id}
                                inspection={inspection}
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
                        inspections &&
                        inspections?.length === 0 && (
                            <Empty description={"Проверок не найдено"} />
                        )}
                </InfiniteScrollPage>
            </DynamicModuleLoader>
        );
    },
);
