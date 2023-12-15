import { ConstructionObject } from "@/entities/ConstructionObject";
import addressSvg from "@/shared/assets/svg/addressField.svg";
import endDateSvg from "@/shared/assets/svg/dateEnd.svg";
import startDateSvg from "@/shared/assets/svg/dateStart.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Card, Flex, Skeleton } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import cls from "./ConstructionObjectItem.module.scss";

interface ConstructionObjectItemProps {
    className?: string;
    constructionObject: ConstructionObject;
    isLoading?: boolean;
}

export const ConstructionObjectItem = memo(
    (props: ConstructionObjectItemProps) => {
        const { className, constructionObject, isLoading } = props;

        if (isLoading) {
            return <Skeleton active />;
        }

        return (
            <Card
                className={classNames(cls.DepartmentCard, {}, [className])}
                title={constructionObject?.name}
            >
                <Flex vertical gap={8}>
                    <PreviewField
                        component={addressSvg}
                        value={constructionObject?.address}
                    />
                    <Flex gap={"small"}>
                        <PreviewField
                            component={startDateSvg}
                            value={dayjs(constructionObject?.startDate).format(
                                "DD.MM.YYYY",
                            )}
                        />
                        {" - "}
                        <PreviewField
                            component={endDateSvg}
                            value={dayjs(constructionObject?.endDate).format(
                                "DD.MM.YYYY",
                            )}
                        />
                    </Flex>
                </Flex>
            </Card>
        );
    },
);
