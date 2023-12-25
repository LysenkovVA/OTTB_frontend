import { OrganizationDetails } from "@/widgets/OrganizationDetails";
import { memo } from "react";

interface OrganizationDetailsPageProps {
    className?: string;
}

const OrganizationDetailsPage = (props: OrganizationDetailsPageProps) => {
    const { className } = props;

    return <OrganizationDetails />;
};

export default memo(OrganizationDetailsPage);
