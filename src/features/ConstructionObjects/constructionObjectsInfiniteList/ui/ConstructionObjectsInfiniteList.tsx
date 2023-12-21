import { ConstructionObjectItem } from "@/entities/ConstructionObject";
import { fetchConstructionObjectsInfiniteList } from "@/features/ConstructionObjects/constructionObjectsInfiniteList/model/services/fetchConstructionObjectsInfiniteList/fetchConstructionObjectsInfiniteList";
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
import { useNavigate } from "react-router-dom";
import {
    getConstructionObjectsInfiniteList,
    getConstructionObjectsInfiniteListError,
    getConstructionObjectsInfiniteListHasMore,
    getConstructionObjectsInfiniteListIsInitialized,
    getConstructionObjectsInfiniteListIsLoading,
    getConstructionObjectsInfiniteListLimit,
    getConstructionObjectsInfiniteListOffset,
} from "../model/selectors/constructionObjectsInfiniteListSelectors";
import {
    constructionObjectsInfiniteListActions,
    constructionObjectsInfiniteListReducer,
} from "../model/slice/constructionObjectsInfiniteListSlice";

interface ConstructionObjectsInfiniteListProps {
    className?: string;
}

const reducers: ReducersList = {
    constructionObjectsInfiniteListSchema:
        constructionObjectsInfiniteListReducer,
};

export const ConstructionObjectsInfiniteList = memo(
    (props: ConstructionObjectsInfiniteListProps) => {
        const { className } = props;

        const navigate = useNavigate();

        const dispatch = useAppDispatch();
        const constructionObjects = useSelector(
            getConstructionObjectsInfiniteList.selectAll,
        );
        const isLoading = useSelector(
            getConstructionObjectsInfiniteListIsLoading,
        );
        const error = useSelector(getConstructionObjectsInfiniteListError);
        const limit = useSelector(getConstructionObjectsInfiniteListLimit);
        const offset = useSelector(getConstructionObjectsInfiniteListOffset);
        const hasMore = useSelector(getConstructionObjectsInfiniteListHasMore);
        const isInitialized = useSelector(
            getConstructionObjectsInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(
                    fetchConstructionObjectsInfiniteList({ replaceData: true }),
                );
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    constructionObjectsInfiniteListActions.setOffset(
                        limit + offset,
                    ),
                );
                dispatch(
                    fetchConstructionObjectsInfiniteList({
                        replaceData: false,
                    }),
                );
            }
        }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

        const skeletons = useMemo(() => {
            const skeletons = [];

            for (let i = 0; i < limit; i++) {
                skeletons.push(
                    <ConstructionObjectItem
                        key={i}
                        constructionObject={{ id: "0", name: "" }}
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
                        {constructionObjects?.map((constructionObject) => (
                            <ConstructionObjectItem
                                key={constructionObject.id}
                                constructionObject={constructionObject}
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
                        constructionObjects &&
                        constructionObjects?.length === 0 && (
                            <Empty description={"Объектов не найдено"} />
                        )}
                </InfiniteScrollPage>
            </DynamicModuleLoader>
        );
    },
);
