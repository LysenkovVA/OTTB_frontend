import { OrganizationDetailsCard } from "@/features/Organizations/organizationDetailsCard";
import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./OrganizationDetailsPage.module.scss";

interface OrganizationDetailsPageProps {
    className?: string;
}

const OrganizationDetailsPage = (props: OrganizationDetailsPageProps) => {
    const { className } = props;

    return (
        <div
            className={classNames(cls.OrganizationDetailsPage, {}, [className])}
        >
            <OrganizationDetailsCard />
        </div>
    );
};

export default memo(OrganizationDetailsPage);
