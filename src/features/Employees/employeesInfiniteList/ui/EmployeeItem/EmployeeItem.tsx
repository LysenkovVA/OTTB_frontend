import berthSvg from "@/shared/assets/svg/berth.svg";
import departmentSvg from "@/shared/assets/svg/department.svg";
import organizationSvg from "@/shared/assets/svg/organization.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Card, Flex, Skeleton, Typography } from "antd";

import { Employee } from "@/entities/Employee";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import cls from "./EmployeeItem.module.scss";

interface EmployeeItemProps {
    className?: string;
    employee: Employee;
    isLoading?: boolean;
    onClick?: (id: string | undefined) => void;
}

export const EmployeeItem = (props: EmployeeItemProps) => {
    const { className, employee, isLoading, onClick } = props;

    if (isLoading) {
        return <Skeleton active />;
    }

    return (
        <Card
            className={classNames(cls.EmployeeCard, {}, [className])}
            hoverable
            size={"small"}
            bodyStyle={{ padding: 10, overflow: "hidden" }}
            onClick={(e) => onClick?.(employee?.id)}
        >
            <Flex vertical>
                <Flex>
                    <EditableAvatar
                        className={cls.photo}
                        file={employee.avatar}
                        canEdit={false}
                        shape={"square"}
                    />
                    <Flex vertical align={"flex-start"}>
                        <Typography.Text className={cls.surname}>
                            {employee.surname}
                        </Typography.Text>
                        <Typography.Text>{employee.name}</Typography.Text>
                    </Flex>
                </Flex>
                <PreviewField
                    component={berthSvg}
                    value={employee.berth?.value}
                />
                <PreviewField
                    component={departmentSvg}
                    value={employee.department?.name}
                />
                <PreviewField
                    component={organizationSvg}
                    value={employee.workspace?.name}
                />
            </Flex>
        </Card>
    );
};

export default EmployeeItem;
