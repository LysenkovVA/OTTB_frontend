import { classNames } from "@/shared/lib/classNames/classNames";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Modal, Typography } from "antd";
import { ReactNode, memo, useState } from "react";
import cls from "./ViewWrapper.module.scss";

export interface ViewWrapperProps {
    className?: string;
    children?: ReactNode;
    title?: string;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
    deleteTitle?: string;
    deleteText?: string;
}

export const ViewWrapper = memo((props: ViewWrapperProps) => {
    const {
        className,
        children,
        title,
        onDeleteClick,
        onEditClick,
        deleteTitle = "Подтвердите удаление",
        deleteText = "Вы действительно хотите удалить эту запись?",
    } = props;

    const [modalOpen, setModalOpen] = useState(false);

    const titleContent = (
        <Flex gap={8} justify={"start"} align={"center"}>
            <Typography.Text type={"secondary"} style={{ fontSize: "large" }}>
                {title}
            </Typography.Text>
        </Flex>
    );

    const extraContent = (
        <>
            <Modal
                title={
                    <Flex gap={8}>
                        <DeleteOutlined style={{ color: "red" }} />{" "}
                        <Typography.Text>{deleteTitle}</Typography.Text>
                    </Flex>
                }
                centered
                open={modalOpen}
                onOk={() => {
                    onDeleteClick?.();
                }}
                onCancel={() => setModalOpen(false)}
                okButtonProps={{ danger: true }}
                okText={"Удалить"}
                cancelText={"Отмена"}
            >
                <Typography.Text>{deleteText}</Typography.Text>
            </Modal>
            <Flex gap={8}>
                {onEditClick && (
                    <Button icon={<EditOutlined />} onClick={onEditClick}>
                        {"Править"}
                    </Button>
                )}
                {onDeleteClick && (
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => setModalOpen(true)}
                    >
                        {"Удалить"}
                    </Button>
                )}
            </Flex>
        </>
    );

    return (
        <Card
            className={classNames(cls.ViewWrapper, {}, [className])}
            title={titleContent}
            extra={extraContent}
        >
            {children}
        </Card>
    );
});
