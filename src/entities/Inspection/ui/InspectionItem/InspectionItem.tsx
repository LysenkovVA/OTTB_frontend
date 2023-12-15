import { Inspection } from "@/entities/Inspection";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card, Flex, Skeleton, Typography } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import cls from "./InspectionItem.module.scss";

interface InspectionCardProps {
    className?: string;
    inspection: Inspection;
    isLoading?: boolean;
}

export const InspectionItem = memo((props: InspectionCardProps) => {
    const { className, inspection, isLoading } = props;

    if (isLoading) {
        return <Skeleton active />;
    }

    return (
        <Card
            className={classNames(cls.DepartmentCard, {}, [className])}
            title={
                <Flex justify={"space-between"}>
                    <Flex gap={8}>
                        <Typography.Text type={"warning"} keyboard>
                            {dayjs(inspection?.date).format("DD.MM.YYYY")}
                        </Typography.Text>
                        <Typography.Text>
                            {inspection?.constructionObject?.name}
                        </Typography.Text>
                    </Flex>
                    <Flex gap={4}>
                        {inspection?.inspectionType?.value &&
                        inspection.inspectionType.value === "Плановая" ? (
                            <Typography.Text keyboard>
                                {inspection?.inspectionType?.value}
                            </Typography.Text>
                        ) : (
                            <Typography.Text keyboard type={"danger"}>
                                {inspection?.inspectionType?.value}
                            </Typography.Text>
                        )}
                        {inspection?.isCommitional && (
                            <Typography.Text type={"success"} keyboard>
                                {"Комиссионная"}
                            </Typography.Text>
                        )}
                    </Flex>
                </Flex>
            }
            size={"small"}
        >
            <Flex vertical gap={0}>
                <Typography.Text>
                    {inspection?.constructionObject?.address}
                </Typography.Text>

                <Flex gap={8}>
                    <Typography.Text>
                        {inspection?.resultDocumentType?.value}
                    </Typography.Text>
                    <Typography.Text>
                        {inspection?.documentNumber}
                    </Typography.Text>
                    <Typography.Text>
                        {`от ${dayjs(inspection?.documentDate).format(
                            "DD.MM.YYYY",
                        )}`}
                    </Typography.Text>
                </Flex>
            </Flex>
        </Card>
    );
});
