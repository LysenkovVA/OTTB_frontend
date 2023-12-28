import {
    getEmployee,
    getEmployeeDetails,
    getEmployeeDetailsDataError,
    getEmployeeDetailsIsDataLoading,
    getEmployeeDetailsIsInitialized,
} from "@/entities/Employee";
import {
    employeeDetailsActions,
    employeeDetailsReducer,
} from "@/entities/Employee/model/slice/employeeDetailsSlice";
import { EditEmployee } from "@/features/Employees/editEmployee";
import { deleteEmployee } from "@/features/Employees/employeesInfiniteList/model/services/deleteEmployee/deleteEmployee";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { ViewWrapper } from "@/shared/ui/ViewWrapper";
import { EmployeeDetailsView } from "@/widgets/EmployeeDetails/ui/EmployeeDetailsView/EmployeeDetailsView";
import { Skeleton } from "antd";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export interface EmployeeDetailsProps {
    className?: string;
}

const reducers: ReducersList = {
    employeeDetailsSchema: employeeDetailsReducer,
};

export const EmployeeDetails = memo((props: EmployeeDetailsProps) => {
    const { className } = props;

    const { id: employeeId } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getEmployeeDetailsIsDataLoading);
    const error = useSelector(getEmployeeDetailsDataError);
    const isInitialized = useSelector(getEmployeeDetailsIsInitialized);
    const employeeDetails = useSelector(getEmployeeDetails);

    useInitialEffect(() => {
        if (!isInitialized && !isLoading && employeeId) {
            dispatch(getEmployee({ id: employeeId }));
        }
    });

    const onCancel = useCallback(() => {
        if (employeeDetails) {
            dispatch(employeeDetailsActions.setFormData(employeeDetails));
        }

        setIsEditMode(false);
    }, [dispatch, employeeDetails]);

    const onDelete = useCallback(() => {
        if (employeeId) {
            try {
                dispatch(deleteEmployee({ employeeId }));
                navigate(-1);
            } catch {}
        }
    }, [dispatch, navigate, employeeId]);

    const skeletonContent = <Skeleton active />;

    const errorContent = (
        <ErrorInfo status={"error"} title={error} subtitle={""} />
    );

    const viewContent = employeeDetails ? (
        <ViewWrapper
            title={`${employeeDetails?.surname} ${employeeDetails?.name}`}
            deleteText={`Удалить ${employeeDetails?.surname} ${employeeDetails?.name}?`}
            onEditClick={() => {
                setIsEditMode(true);
            }}
            onDeleteClick={onDelete}
        >
            <EmployeeDetailsView employee={employeeDetails} />
        </ViewWrapper>
    ) : null;

    const editContent = (
        <EditEmployee
            onUpdated={() => {
                setIsEditMode(false);
                navigate(-1);
            }}
            onCanceled={onCancel}
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            {isLoading
                ? skeletonContent
                : error
                ? errorContent
                : isEditMode
                ? editContent
                : viewContent}
        </DynamicModuleLoader>
    );
});
