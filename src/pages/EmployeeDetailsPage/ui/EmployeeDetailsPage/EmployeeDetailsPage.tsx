import { EmployeeDetails } from "@/widgets/EmployeeDetails";
import { memo } from "react";

interface EmployeeDetailsPageProps {
    className?: string;
}

const EmployeeDetailsPage = (props: EmployeeDetailsPageProps) => {
    return <EmployeeDetails />;
};

export default memo(EmployeeDetailsPage);
