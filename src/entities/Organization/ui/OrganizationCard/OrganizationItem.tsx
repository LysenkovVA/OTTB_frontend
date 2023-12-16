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
}

export const OrganizationItem = memo((props: OrganizationItemProps) => {
    const { className, organization, isLoading, onClick } = props;

    if (isLoading) {
        return <Skeleton active />;
    }

    return (
        <Card
            hoverable
            size={"small"}
            className={classNames(cls.OrganizationCard, {}, [className])}
            title={organization.name}
            onClick={() => onClick?.(organization.id)}
        >
            <div>
                <Typography.Text>{"Контент"}</Typography.Text>
            </div>
        </Card>
    );
});
