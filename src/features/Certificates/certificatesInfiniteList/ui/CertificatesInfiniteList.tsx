import { CertificateItem } from "@/entities/Certificate";
import { fetchInfiniteListCertificates } from "@/features/Certificates/certificatesInfiniteList/model/services/fetchInfiniteListCertificates/fetchInfiniteListCertificates";
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
import {
    getCertificatesInfiniteList,
    getCertificatesInfiniteListError,
    getCertificatesInfiniteListHasMore,
    getCertificatesInfiniteListIsInitialized,
    getCertificatesInfiniteListIsLoading,
    getCertificatesInfiniteListLimit,
    getCertificatesInfiniteListOffset,
} from "../model/selectors/certificatesInfiniteListSelectors";
import {
    certificatesInfiniteListActions,
    certificatesInfiniteListReducer,
} from "../model/slice/certificatesInfiniteListSlice";

interface CertificatesInfiniteListProps {
    className?: string;
}

const reducers: ReducersList = {
    certificatesInfiniteListSchema: certificatesInfiniteListReducer,
};

export const CertificatesInfiniteList = memo(
    (props: CertificatesInfiniteListProps) => {
        const { className } = props;

        const dispatch = useAppDispatch();
        const certificates = useSelector(getCertificatesInfiniteList.selectAll);
        const isLoading = useSelector(getCertificatesInfiniteListIsLoading);
        const error = useSelector(getCertificatesInfiniteListError);
        const limit = useSelector(getCertificatesInfiniteListLimit);
        const offset = useSelector(getCertificatesInfiniteListOffset);
        const hasMore = useSelector(getCertificatesInfiniteListHasMore);
        const isInitialized = useSelector(
            getCertificatesInfiniteListIsInitialized,
        );

        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(fetchInfiniteListCertificates({ replaceData: true }));
            }
        });

        const onLoadNextPart = useCallback(() => {
            if (isInitialized && hasMore && !isLoading) {
                dispatch(
                    certificatesInfiniteListActions.setOffset(limit + offset),
                );
                dispatch(fetchInfiniteListCertificates({ replaceData: false }));
            }
        }, [dispatch, hasMore, isInitialized, isLoading, limit, offset]);

        const skeletons = useMemo(() => {
            const skeletons = [];

            for (let i = 0; i < limit; i++) {
                skeletons.push(
                    <CertificateItem
                        key={i}
                        certificate={{ id: "0" }}
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
                        {certificates?.map((certificate) => (
                            <CertificateItem
                                key={certificate.id}
                                certificate={certificate}
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
                        certificates &&
                        certificates?.length === 0 && (
                            <Empty description={"Удостоверений не найдено"} />
                        )}
                </InfiniteScrollPage>
            </DynamicModuleLoader>
        );
    },
);
