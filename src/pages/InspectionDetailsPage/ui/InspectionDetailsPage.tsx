import { InspectionDetails } from "@/widgets/InspectionDetails";
import { memo } from "react";

export interface InspectionDetailsPageProps {
    className?: string;
}

const InspectionDetailsPage = (props: InspectionDetailsPageProps) => {
    const { className } = props;

    return <InspectionDetails />;
};

export default memo(InspectionDetailsPage);
