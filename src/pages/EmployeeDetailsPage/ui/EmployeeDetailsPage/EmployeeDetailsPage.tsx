import { EmployeeDetailsCard } from "@/features/Employees/employeeDetailsCard";
import { memo } from "react";

interface EmployeeDetailsPageProps {
    className?: string;
}

const EmployeeDetailsPage = (props: EmployeeDetailsPageProps) => {
    return <EmployeeDetailsCard />;
};

export default memo(EmployeeDetailsPage);
