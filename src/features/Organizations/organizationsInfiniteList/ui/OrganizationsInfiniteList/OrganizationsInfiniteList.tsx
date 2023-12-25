import { getUserActiveWorkspaceId } from "@/entities/User";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
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
    getOrganizationsInfiniteList,
    getOrganizationsInfiniteListError,
    getOrganizationsInfiniteListHasMore,
    getOrganizationsInfiniteListIsInitialized,
    getOrganizationsInfiniteListIsLoading,
    getOrganizationsInfiniteListLimit,
    getOrganizationsInfiniteListOffset,
} from "../../model/selectors/organizationsInfiniteListSelectors";
import { fetchOrganizationsInfiniteList } from "../../model/services/fetchOrganizationsInfiniteList/fetchOrganizationsInfiniteList";
import {
    organizationsInfiniteListActions,
    organizationsInfiniteListReducer,
} from "../../model/slice/organizationsInfiniteListSlice";
import { OrganizationListItem } from "../OrganizationItem/OrganizationListItem";

interface OrganizationsInfiniteListProps {
    className?: string;
}
const reducers: ReducersList = {
    organizationsInfiniteListSchema: organizationsInfiniteListReducer,
};

export const OrganizationsInfiniteList = memo(
    (props: OrganizationsInfiniteListProps) => {
        const { className } = props;

        const navigate = useNavigate();

        const dispatch = useAppDispatch();
        const organizations = useSelector(
            getOrganizationsInfiniteList.selectAll,
        );
        const isLoading = useSelector(getOrganizationsInfiniteListIsLoading);
        const error = useSelector(getOrganizationsInfiniteListError);
        const limit = useSelector(getOrganizationsInfiniteListLimit);
        const offset = useSelector(getOrganizationsInfiniteListOffset);
        const hasMore = useSelector(getOrganizationsInfiniteListHasMore);
        const isInitialized = useSelector(
            getOrganizationsInfiniteListIsInitialized,
        );
        const workspaceId = useSelector(getUserActiveWorkspaceId);

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(
                    fetchOrganizationsInfiniteList({
                        workspaceId,
                        replaceData: true,
                    }),
                );
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    organizationsInfiniteListActions.setOffset(limit + offset),
                );
                dispatch(
                    fetchOrganizationsInfiniteList({
                        workspaceId,
                        replaceData: false,
                    }),
                );
            }
        }, [
            dispatch,
            hasMore,
            isInitialized,
            isLoading,
            limit,
            offset,
            workspaceId,
        ]);

        const skeletons = useMemo(() => {
            const skeletons = [];

            for (let i = 0; i < limit; i++) {
                skeletons.push(
                    <OrganizationListItem
                        key={i}
                        organization={{ id: "0", name: "" }}
                        isLoading={true}
                    />,
                );
            }

            return skeletons;
        }, [limit]);

        const onClick = useCallback(
            (id: string | undefined) => {
                if (id) {
                    navigate(RoutePath.organization_details + id);
                }
            },
            [navigate],
        );

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
                {!isLoading && error && (
                    <ErrorInfo status={"error"} title={error} subtitle={""} />
                )}
                <InfiniteScrollPage onScrollEnd={onLoadNextPart}>
                    <Flex vertical gap={8}>
                        {organizations?.map((organization) => (
                            <OrganizationListItem
                                key={organization.id}
                                organization={organization}
                                onClick={onClick}
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
                        organizations &&
                        organizations?.length === 0 && (
                            <Empty description={"Организаций не найдено"} />
                        )}
                </InfiniteScrollPage>
            </DynamicModuleLoader>
        );
    },
);
