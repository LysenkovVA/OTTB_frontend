import { OrganizationDetailsForm } from "@/features/Organizations/organizationDetailsCard";
import {
    getOrganizationDetails,
    getOrganizationDetailsForm,
    getOrganizationDetailsIsInitialized,
    getOrganizationDetailsIsLoading,
} from "@/features/Organizations/organizationDetailsCard/model/selectors/organizationDetailsSelectors";
import { fetchOrganizationById } from "@/features/Organizations/organizationDetailsCard/model/services/fetchOrganizationById/fetchOrganizationById";
import { updateOrganization } from "@/features/Organizations/organizationDetailsCard/model/services/updateOrganization/updateOrganization";
import {
    organizationDetailsActions,
    organizationDetailsReducer,
} from "@/features/Organizations/organizationDetailsCard/model/slice/organizationDetailsSlice";
import { OrganizationDetailsView } from "@/features/Organizations/organizationDetailsCard/ui/OrganizationDetailsView/OrganizationDetailsView";
import { removeOrganization } from "@/features/Organizations/organizationsInfiniteList/model/services/removeOrganization/removeOrganization";
import { organizationsInfiniteListActions } from "@/features/Organizations/organizationsInfiniteList/model/slice/organizationsInfiniteListSlice";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
import { ViewWrapper } from "@/shared/ui/ViewWrapper";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface OrganizationDetailsCardProps {
    className?: string;
}

const reducers: ReducersList = {
    organizationDetailsSchema: organizationDetailsReducer,
};

export const OrganizationDetailsCard = memo(
    (props: OrganizationDetailsCardProps) => {
        const { className } = props;

        const [form] = useForm();
        const navigate = useNavigate();

        const [isEditMode, setIsEditMode] = useState(false);

        const { id: organizationId } = useParams<{ id: string }>();

        const dispatch = useAppDispatch();
        const isLoading = useSelector(getOrganizationDetailsIsLoading);
        const isInitialized = useSelector(getOrganizationDetailsIsInitialized);
        const organizationDetails = useSelector(getOrganizationDetails);
        const organizationDetailsForm = useSelector(getOrganizationDetailsForm);

        useInitialEffect(() => {
            if (!isInitialized && !isLoading && organizationId) {
                dispatch(fetchOrganizationById({ organizationId }));
            }
        });

        const onSave = useCallback(async () => {
            if (organizationDetailsForm) {
                try {
                    await dispatch(
                        updateOrganization({
                            organization: organizationDetailsForm,
                        }),
                    );

                    setIsEditMode(false);
                    // Возврат к списку
                    navigate(-1);
                } catch {}
            }
        }, [dispatch, navigate, organizationDetailsForm]);

        const onCancel = useCallback(() => {
            if (organizationDetails) {
                dispatch(
                    organizationDetailsActions.setFormData(organizationDetails),
                );
            }

            setIsEditMode(false);
        }, [dispatch, organizationDetails]);

        const onDelete = useCallback(async () => {
            if (organizationId) {
                try {
                    await dispatch(removeOrganization({ organizationId }));
                    dispatch(
                        organizationsInfiniteListActions.removeOne(
                            organizationId,
                        ),
                    );
                    navigate(-1);
                } catch {}
            }
        }, [dispatch, navigate, organizationId]);

        return (
            <DynamicModuleLoader reducers={reducers}>
                {isEditMode ? (
                    <EditFormWrapper
                        title={`${organizationDetails?.name}`}
                        form={form}
                        onSave={onSave}
                        onCancel={onCancel}
                    >
                        <OrganizationDetailsForm form={form} />
                    </EditFormWrapper>
                ) : (
                    <ViewWrapper
                        title={`${organizationDetails?.name}`}
                        deleteText={`Удалить ${organizationDetails?.name}?`}
                        onEditClick={() => setIsEditMode(true)}
                        onDeleteClick={onDelete}
                    >
                        <OrganizationDetailsView />
                    </ViewWrapper>
                )}
            </DynamicModuleLoader>
        );
    },
);
