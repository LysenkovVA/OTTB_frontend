import {
    checkListDetailsReducer,
    getCheckListDetailsIsUpdating,
} from "@/entities/CheckList";
import { CheckListForm } from "@/features/CheckLists/createCheckList/ui/CheckListForm/CheckListForm";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { SubmitButton } from "@/shared/ui/EditFormWrapper/ui/SubmitButton/SubmitButton";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Drawer, DrawerProps, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import cls from "./CreateCheckList.module.scss";

export interface CreateCheckListProps {
    className?: string;
    drawerPlacement?: DrawerProps["placement"];
}

const reducers: ReducersList = {
    checkListDetailsSchema: checkListDetailsReducer,
};

export const CreateCheckList = memo((props: CreateCheckListProps) => {
    const { className, drawerPlacement = "bottom" } = props;

    const [form] = useForm();

    const [open, setOpen] = useState(false);

    // const dispatch = useAppDispatch();
    // const detailsForm = useSelector(getCheckListDetailsForm);
    const isUpdating = useSelector(getCheckListDetailsIsUpdating);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className={classNames(cls.CreateCheckList, {}, [className])}>
            <Drawer
                title="Новый чек-лист"
                placement={drawerPlacement}
                style={{ overflowY: "auto" }}
                height={"100%"}
                width={"100%"}
                destroyOnClose
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose} disabled={isUpdating}>
                            Отмена
                        </Button>
                        <SubmitButton
                            // onClick={onSave}
                            form={form}
                            title={isUpdating ? "Сохранение..." : "Сохранить"}
                            loading={isUpdating}
                            disabled={isUpdating}
                        />
                    </Space>
                }
                // getContainer={false}
            >
                <DynamicModuleLoader reducers={reducers}>
                    <CheckListForm form={form} onFinish={onClose} />
                </DynamicModuleLoader>
            </Drawer>
            <Button
                type={"dashed"}
                shape={"round"}
                icon={<UnorderedListOutlined />}
                onClick={showDrawer}
            >
                {"Создать список"}
            </Button>
        </div>
    );
});
