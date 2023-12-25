import { Organization } from "@/entities/Organization";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Typography } from "antd";
import { memo } from "react";
import cls from "./OrganizationDetailsView.module.scss";

interface OrganizationDetailsViewProps {
    className?: string;
    organization: Organization;
}

export const OrganizationDetailsView = memo(
    (props: OrganizationDetailsViewProps) => {
        const { className, organization } = props;

        return (
            <div
                className={classNames(cls.OrganizationDetailsView, {}, [
                    className,
                ])}
            >
                <Typography.Text>{organization?.name}</Typography.Text>
            </div>
        );
    },
);
