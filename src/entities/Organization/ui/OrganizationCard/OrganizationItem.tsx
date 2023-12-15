import { Organization } from "@/entities/Organization";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Skeleton, Typography } from "antd";
import { memo, useState } from "react";
import cls from "./OrganizationItem.module.scss";

interface OrganizationItemProps {
    className?: string;
    organization: Organization;
    isLoading?: boolean;
    onClick?: (id: string | undefined) => void;
    onDelete?: (id: string | undefined) => void;
}

export const OrganizationItem = memo((props: OrganizationItemProps) => {
    const { className, organization, isLoading, onClick, onDelete } = props;

    const [modalOpen, setModalOpen] = useState(false);

    if (isLoading) {
        return <Skeleton active />;
    }

    const extraContent = (
        <>
            <Modal
                title="Подтвердите удаление"
                centered
                open={modalOpen}
                onOk={() => {
                    setModalOpen(false);
                    onDelete?.(organization.id);
                }}
                onCancel={() => setModalOpen(false)}
            >
                <DeleteOutlined style={{ color: "red" }} />
                <p>Удалить?</p>
            </Modal>
            <Button
                className={cls.deleteButton}
                icon={<DeleteOutlined style={{ color: "lightgray" }} />}
                onClick={() => setModalOpen(true)}
                danger
                type={"link"}
            />
        </>
    );

    return (
        <Card
            hoverable
            size={"small"}
            className={classNames(cls.OrganizationCard, {}, [className])}
            title={organization.name}
            extra={extraContent}
            onClick={() => onClick?.(organization.id)}
        >
            <div>
                <Typography.Text>{"Контент"}</Typography.Text>
            </div>
        </Card>
    );
});
