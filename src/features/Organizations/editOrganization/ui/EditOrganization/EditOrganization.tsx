import { getOrganizationDetailsForm } from "@/entities/Organization";
import { getUserActiveWorkspaceId } from "@/entities/User";
import {
    createOrganization,
    updateOrganization,
} from "@/features/Organizations/organizationsInfiniteList";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { OrganizationDetailsForm } from "../OrganizationDetailsForm/OrganizationDetailsForm";

export interface EditOrganizationProps {
    className?: string;
    onUpdated: () => void;
    onCanceled: () => void;
}

export const EditOrganization = memo((props: EditOrganizationProps) => {
    const { className, onUpdated, onCanceled } = props;

    const [form] = useForm();
    const dispatch = useAppDispatch();
    const organizationDetailsForm = useSelector(getOrganizationDetailsForm);
    const workspaceId = useSelector(getUserActiveWorkspaceId);

    const onSave = useCallback(async () => {
        if (organizationDetailsForm) {
            try {
                if (!organizationDetailsForm.id) {
                    // Создаем запись
                    await dispatch(
                        createOrganization({
                            data: organizationDetailsForm,
                            workspaceId,
                        }),
                    );
                } else {
                    // Обновляем запись
                    await dispatch(
                        updateOrganization({
                            id: organizationDetailsForm.id,
                            data: organizationDetailsForm,
                        }),
                    );
                }

                onUpdated();
            } catch {}
        }
    }, [dispatch, onUpdated, organizationDetailsForm, workspaceId]);

    return (
        <EditFormWrapper
            title={
                organizationDetailsForm?.id
                    ? `${organizationDetailsForm?.name}`
                    : "Новая организация"
            }
            form={form}
            onSaveClick={onSave}
            onBackClick={onCanceled}
        >
            <OrganizationDetailsForm form={form} />
        </EditFormWrapper>
    );
});
