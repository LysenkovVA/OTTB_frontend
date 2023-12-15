import { OrganizationsInfiniteList } from "@/features/Organizations/organizationsInfiniteList";
import { memo } from "react";

interface OrganizationsPageProps {
    className?: string;
}

const OrganizationsPage = (props: OrganizationsPageProps) => {
    const { className } = props;

    return <OrganizationsInfiniteList />;
};

export default memo(OrganizationsPage);
