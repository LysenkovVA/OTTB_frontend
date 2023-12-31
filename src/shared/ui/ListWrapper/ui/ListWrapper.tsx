import { classNames } from "@/shared/lib/classNames/classNames";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";
import { ReactNode } from "react";
import cls from "./ListWrapper.module.scss";

export interface ListWrapperProps {
    children?: ReactNode;
    className?: string;
    title?: string;
    onAddClick?: () => void;
}

export const ListWrapper = (props: ListWrapperProps) => {
    const { className, children, title, onAddClick } = props;

    const titleContent = (
        <Flex gap={8} justify={"start"} align={"center"}>
            <Typography.Text type={"secondary"} style={{ fontSize: "large" }}>
                {title ?? "Список"}
            </Typography.Text>
        </Flex>
    );

    const extraContent = (
        <Flex>
            <Button
                icon={<PlusOutlined />}
                type={"primary"}
                onClick={onAddClick}
            >
                Добавить
            </Button>
        </Flex>
    );

    return (
        <Card
            className={classNames(cls.ListWrapper, {}, [className])}
            title={titleContent}
            bodyStyle={{ padding: 10 }}
            extra={extraContent}
        >
            {children}
        </Card>
    );
};
