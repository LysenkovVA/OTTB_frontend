import { classNames } from "@/shared/lib/classNames/classNames";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
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

    return (
        <Card
            className={classNames(cls.ListWrapper, {}, [className])}
            title={title ?? "Список"}
            bodyStyle={{ padding: 10 }}
            extra={
                <Button
                    icon={<PlusOutlined />}
                    type={"primary"}
                    onClick={onAddClick}
                >
                    Добавить
                </Button>
            }
        >
            {children}
        </Card>
    );
};
