import {
    getDepartmentDetails,
    getDepartmentDetailsDataError,
    getDepartmentDetailsIsDataLoading,
} from "@/features/Departments/departmentDetailsCard/model/selectors/departmentDetailsSelectors";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { Skeleton, Typography } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";
import cls from "./DepartmentView.module.scss";

export interface DepartmentViewProps {
    className?: string;
}

export const DepartmentView = memo((props: DepartmentViewProps) => {
    const { className } = props;

    const isLoading = useSelector(getDepartmentDetailsIsDataLoading);
    const error = useSelector(getDepartmentDetailsDataError);
    const departmentDetails = useSelector(getDepartmentDetails);

    if (isLoading) {
        return <Skeleton active />;
    }

    if (error) {
        return <ErrorInfo status={"error"} title={error} subtitle={""} />;
    }

    return (
        <div className={classNames(cls.DepartmentView, {}, [className])}>
            <Typography.Text>{departmentDetails?.name}</Typography.Text>
        </div>
    );
});
