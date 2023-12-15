import { Department } from "@/entities/Department/model/types/Department";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card, Skeleton, Typography } from "antd";
import { memo } from "react";
import cls from "./DepartmentCard.module.scss";

interface DepartmentCardProps {
    className?: string;
    department: Department;
    isLoading?: boolean;
}

export const DepartmentCard = memo((props: DepartmentCardProps) => {
    const { className, department, isLoading } = props;

    if (isLoading) {
        return <Skeleton active />;
    }

    return (
        <Card
            className={classNames(cls.DepartmentCard, {}, [className])}
            title={department?.name}
        >
            <Typography.Text>{"Контент"}</Typography.Text>
        </Card>
    );
});
