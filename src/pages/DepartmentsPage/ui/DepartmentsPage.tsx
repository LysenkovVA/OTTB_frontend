import { DepartmentsInfiniteList } from "@/features/Departments/departmentsInfiniteList";
import { memo } from "react";

export interface DepartmentsPageProps {
    className?: string;
}

const DepartmentsPage = (props: DepartmentsPageProps) => {
    const { className } = props;

    return <DepartmentsInfiniteList />;
};

export default memo(DepartmentsPage);
