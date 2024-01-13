import { getUser, getUserActiveWorkspace } from "@/entities/User";
import {
    WorkspaceForm,
    fetchWorkspace,
    getWorkspaceDetailsForm,
    updateWorkspace,
    workspaceDetailsReducer,
} from "@/entities/Workspace";
import { WorkspaceSelector } from "@/features/Workspaces/workspaceSelector";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { DrawerFormWrapper } from "@/shared/ui/DrawerFormWrapper";
import { Flex, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import cls from "./WorkspaceView.module.scss";

export interface WorkspaceWidgetProps {
    className?: string;
}

const reducersModal: ReducersList = {
    workspaceDetailsSchema: workspaceDetailsReducer,
};

export const WorkspaceView = memo((props: WorkspaceWidgetProps) => {
    const { className } = props;

    const [form] = useForm();
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const user = useSelector(getUser);
    const activeWorkspace = useSelector(getUserActiveWorkspace);
    const workspaceDetails = useSelector(getWorkspaceDetailsForm);

    const isFreeSubscription = user?.subscriptions?.some((subscription) => {
        return subscription.value === "Free";
    });

    const onEdit = useCallback(() => {
        if (activeWorkspace?.id) {
            dispatch(fetchWorkspace({ id: activeWorkspace?.id }));
            setModalOpen(true);
        } else {
            alert("Рабочее пространство не выбрано!");
        }
    }, [dispatch, activeWorkspace?.id]);

    const onSave = useCallback(async () => {
        if (workspaceDetails?.id) {
            // Обновляем
            await dispatch(
                updateWorkspace({
                    id: workspaceDetails.id,
                    data: workspaceDetails,
                }),
            );

            // Закрываем окно
            setModalOpen(false);
        }
    }, [dispatch, workspaceDetails]);

    return (
        <div className={classNames(cls.WorkspaceView, {}, [className])}>
            {isFreeSubscription ? (
                <Flex align={"center"} justify={"start"}>
                    <DrawerFormWrapper
                        open={modalOpen}
                        title={workspaceDetails?.name}
                        onSave={onSave}
                        onCancel={() => setModalOpen(false)}
                        form={form}
                    >
                        <DynamicModuleLoader reducers={reducersModal}>
                            <WorkspaceForm form={form} />
                        </DynamicModuleLoader>
                    </DrawerFormWrapper>
                    <Typography.Text className={cls.text} onClick={onEdit}>
                        {activeWorkspace?.name}
                    </Typography.Text>
                </Flex>
            ) : (
                <WorkspaceSelector
                    value={undefined}
                    onValueChanged={() => {}}
                />
            )}
        </div>
    );
});
