import { classNames } from "@/shared/lib/classNames/classNames";
import { SubmitButton } from "@/shared/ui/EditFormWrapper/ui/SubmitButton/SubmitButton";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, Flex, FormInstance, Typography } from "antd";
import { ReactNode, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import cls from "./EditFormWrapper.module.scss";

export interface EditFormWrapperProps {
    className?: string;
    children?: ReactNode;
    title?: string;
    onSave?: () => void;
    onCancel?: () => void;
    form?: FormInstance;
}

export const EditFormWrapper = memo((props: EditFormWrapperProps) => {
    const { className, children, title = "", onSave, onCancel, form } = props;

    const navigate = useNavigate();

    const onBackClick = useCallback(() => {
        onCancel?.();
        navigate(-1);
    }, [navigate, onCancel]);

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
                onClick={onSave}
            />
        </Flex>
    );

    return (
        <Card
            className={classNames(cls.EditFormWrapper, {}, [className])}
            title={titleContent}
            extra={extraContent}
        >
            {children}
        </Card>
    );
});
