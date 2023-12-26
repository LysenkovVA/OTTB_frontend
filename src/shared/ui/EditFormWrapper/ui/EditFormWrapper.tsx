import { classNames } from "@/shared/lib/classNames/classNames";
import { SubmitButton } from "@/shared/ui/EditFormWrapper/ui/SubmitButton/SubmitButton";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Flex, FormInstance, Typography } from "antd";
import { ReactNode, memo } from "react";
import cls from "./EditFormWrapper.module.scss";

export interface EditFormWrapperProps {
    className?: string;
    children?: ReactNode;
    title?: string;
    onSaveClick?: () => void;
    onBackClick?: () => void;
    form?: FormInstance;
}

export const EditFormWrapper = memo((props: EditFormWrapperProps) => {
    const {
        className,
        children,
        title = "",
        onSaveClick,
        onBackClick,
        form,
    } = props;

    const titleContent = (
        <Flex gap={8} justify={"start"} align={"center"}>
            <Button
                icon={<ArrowLeftOutlined />}
                type={"link"}
                onClick={onBackClick}
            ></Button>
            <Typography.Text type={"secondary"} style={{ fontSize: "large" }}>
                {title}
            </Typography.Text>
        </Flex>
    );

    const extraContent = (
        <Flex>
            <SubmitButton
                title={"Сохранить"}
                icon={<SaveOutlined />}
                form={form}
                onClick={onSaveClick}
            />
        </Flex>
    );

    return (
        <Card
            rootClassName={classNames(cls.EditFormWrapper, {}, [className])}
            title={titleContent}
            extra={extraContent}
        >
            {children}
        </Card>
    );
});
