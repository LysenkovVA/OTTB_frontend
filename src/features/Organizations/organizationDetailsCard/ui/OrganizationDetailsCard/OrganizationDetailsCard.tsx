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
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Modal, Typography } from "antd";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import cls from "./OrganizationDetailsCard.module.scss";

interface OrganizationDetailsCardProps {
    className?: string;
}

const reducers: ReducersList = {
    organizationDetailsSchema: organizationDetailsReducer,
};

export const OrganizationDetailsCard = memo(
    (props: OrganizationDetailsCardProps) => {
        const { className } = props;

        const [modalOpen, setModalOpen] = useState(false);
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

        const onDelete = useCallback(
            async (id: string | undefined) => {
                if (id) {
                    try {
                        await dispatch(
                            removeOrganization({ organizationId: id }),
                        );
                        dispatch(
                            organizationsInfiniteListActions.removeOne(id),
                        );
                        navigate(-1);
                    } catch {}
                }
            },
            [dispatch, navigate],
        );

        const extraContent = (
            <>
                <Modal
                    title="Подтвердите удаление"
                    centered
                    open={modalOpen}
                    onOk={() => {
                        if (organizationDetails) {
                            setModalOpen(false);
                            onDelete?.(organizationDetails.id);
                        }
                    }}
                    onCancel={() => setModalOpen(false)}
                    okButtonProps={{ danger: true }}
                    okText={"Удалить"}
                    cancelText={"Отмена"}
                >
                    <Flex gap={8}>
                        <DeleteOutlined style={{ color: "red" }} />
                        <Typography.Text>{`Удалить '${organizationDetails?.name}'?`}</Typography.Text>
                    </Flex>
                </Modal>
                {!isEditMode ? (
                    <Flex gap={8}>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => setIsEditMode(true)}
                        />
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => setModalOpen(true)}
                        />
                    </Flex>
                ) : null}
            </>
        );

        return (
            <DynamicModuleLoader reducers={reducers}>
                <Card
                    className={classNames(cls.OrganizationDetailsCard, {}, [
                        className,
                    ])}
                    extra={extraContent}
                    title={organizationDetails?.name}
                    size={"small"}
                >
                    {isEditMode ? (
                        <OrganizationDetailsForm
                            onSave={onSave}
                            onCancel={onCancel}
                        />
                    ) : (
                        <OrganizationDetailsView />
                    )}
                </Card>
            </DynamicModuleLoader>
        );
    },
);
