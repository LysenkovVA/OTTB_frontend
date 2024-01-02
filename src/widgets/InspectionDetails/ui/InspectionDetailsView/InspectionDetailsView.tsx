import { Inspection } from "@/entities/Inspection";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Typography } from "antd";
import { memo } from "react";
import cls from "./InspectionDetailsView.module.scss";

interface InspectionDetailsViewProps {
    className?: string;
    inspection: Inspection;
}

export const InspectionDetailsView = memo(
    (props: InspectionDetailsViewProps) => {
        const { className, inspection } = props;

        return (
            <div
                className={classNames(cls.InspectionDetailsView, {}, [
                    className,
                ])}
            >
                <Typography.Text>
                    {inspection?.date?.toDateString()}
                </Typography.Text>
            </div>
        );
    },
);
