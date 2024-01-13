import { classNames } from "@/shared/lib/classNames/classNames";
import { SubmitButton } from "@/shared/ui/EditFormWrapper/ui/SubmitButton/SubmitButton";
import { Button, Drawer, DrawerProps, FormInstance, Space } from "antd";
import { ReactNode, memo } from "react";
import cls from "./DrawerFormWrapper.module.scss";

type AppDrawerProps = Omit<DrawerProps, "children" | "title" | "open">;

export interface DrawerFormWrapperProps extends AppDrawerProps {
    className?: string;
    children?: ReactNode;
    open: boolean;
    title: string | undefined;
    placement?: DrawerProps["placement"];
    width?: string;
    height?: string;
    actionsDisabled?: boolean;
    onSave: () => void;
    onCancel: () => void;
    form: FormInstance;
}

// TODO: В случае глюков, убрать memo, т.к. есть дочерние компоненты
export const DrawerFormWrapper = memo((props: DrawerFormWrapperProps) => {
    const {
        className,
        children,
        open,
        title = "",
        placement = "bottom",
        width = "30%",
        height = "80%",
        actionsDisabled = false,
        onSave,
        onCancel,
        form,
        ...otherProps
    } = props;

    return (
        <Drawer
            rootClassName={classNames(cls.DrawerFormWrapper, {}, [className])}
            title={title}
            placement={placement}
            style={{ overflowY: "auto" }}
            width={width}
            height={height}
            destroyOnClose
            onClose={onCancel}
            open={open}
            extra={
                <Space>
                    <Button onClick={onCancel} disabled={actionsDisabled}>
                        Отмена
                    </Button>
                    <SubmitButton
                        onClick={onSave}
                        form={form}
                        title={"Сохранить"}
                        disabled={actionsDisabled}
                    />
                </Space>
            }
            // getContainer={false}
            {...otherProps}
        >
            {children}
        </Drawer>
    );
});
