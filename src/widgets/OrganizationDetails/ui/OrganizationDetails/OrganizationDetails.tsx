import {
    getOrganization,
    getOrganizationDetails,
    getOrganizationDetailsError,
    getOrganizationDetailsIsInitialized,
    getOrganizationDetailsIsLoading,
} from "@/entities/Organization";
import {
    organizationDetailsActions,
    organizationDetailsReducer,
} from "@/entities/Organization/model/slice/organizationDetailsSlice";
import { EditOrganization } from "@/features/Organizations/editOrganization";
import { removeOrganization } from "@/features/Organizations/organizationsInfiniteList";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { ViewWrapper } from "@/shared/ui/ViewWrapper";
import { Skeleton } from "antd";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { OrganizationDetailsView } from "../OrganizationDetailsView/OrganizationDetailsView";

export interface OrganizationDetailsProps {
    className?: string;
}

const reducers: ReducersList = {
    organizationDetailsSchema: organizationDetailsReducer,
};

export const OrganizationDetails = memo((props: OrganizationDetailsProps) => {
    const { className } = props;

    const { id: organizationId } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getOrganizationDetailsIsLoading);
    const error = useSelector(getOrganizationDetailsError);
    const isInitialized = useSelector(getOrganizationDetailsIsInitialized);
    const organizationDetails = useSelector(getOrganizationDetails);

    useInitialEffect(() => {
        if (!isInitialized && !isLoading && organizationId) {
            dispatch(getOrganization({ id: organizationId }));
        }
    });

    const onCancel = useCallback(() => {
        if (organizationDetails) {
            dispatch(
                organizationDetailsActions.setFormData(organizationDetails),
            );
        }

        setIsEditMode(false);
    }, [dispatch, organizationDetails]);

    const onDelete = useCallback(() => {
        if (organizationId) {
            try {
                dispatch(removeOrganization({ organizationId }));
                navigate(-1);
            } catch {}
        }
    }, [dispatch, navigate, organizationId]);

    const skeletonContent = <Skeleton active />;

    const errorContent = (
        <ErrorInfo status={"error"} title={error} subtitle={""} />
    );

    const viewContent = organizationDetails ? (
        <ViewWrapper
            title={`${organizationDetails?.name}`}
            deleteText={`Удалить ${organizationDetails?.name}?`}
            onEditClick={() => {
                setIsEditMode(true);
            }}
            onDeleteClick={onDelete}
        >
            <OrganizationDetailsView organization={organizationDetails} />
        </ViewWrapper>
    ) : null;

    const editContent = (
        <EditOrganization
            onUpdated={() => {
                setIsEditMode(false);
                navigate(-1);
            }}
            onCanceled={onCancel}
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            {isLoading
                ? skeletonContent
                : error
                ? errorContent
                : isEditMode
                ? editContent
                : viewContent}
        </DynamicModuleLoader>
    );
});
