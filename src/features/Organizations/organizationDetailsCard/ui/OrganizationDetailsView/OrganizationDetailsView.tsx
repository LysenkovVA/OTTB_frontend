import {
    getOrganizationDetails,
    getOrganizationDetailsError,
    getOrganizationDetailsIsLoading,
} from "@/features/Organizations/organizationDetailsCard/model/selectors/organizationDetailsSelectors";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { Skeleton, Typography } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";
import cls from "./OrganizationDetailsView.module.scss";

interface OrganizationDetailsViewProps {
    className?: string;
}

export const OrganizationDetailsView = memo(
    (props: OrganizationDetailsViewProps) => {
        const { className } = props;

        const isLoading = useSelector(getOrganizationDetailsIsLoading);
        const error = useSelector(getOrganizationDetailsError);
        const organizationDetails = useSelector(getOrganizationDetails);

        if (isLoading) {
            return <Skeleton active />;
        }

        if (error) {
            return <ErrorInfo status={"error"} title={error} subtitle={""} />;
        }

        return (
            <div
                className={classNames(cls.OrganizationDetailsView, {}, [
                    className,
                ])}
            >
                <Typography.Text>{organizationDetails?.name}</Typography.Text>
            </div>
        );
    },
);
