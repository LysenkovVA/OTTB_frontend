import { employeeDetailsReducer } from "@/entities/Employee/model/slice/employeeDetailsSlice";
import { EditEmployee } from "@/features/Employees/editEmployee";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface CreateEmployeePageProps {
    className?: string;
}

const reducers: ReducersList = {
    employeeDetailsSchema: employeeDetailsReducer,
};

const CreateEmployeePage = (props: CreateEmployeePageProps) => {
    const { className } = props;

    const navigate = useNavigate();

    return (
        <DynamicModuleLoader reducers={reducers}>
            <EditEmployee
                onUpdated={() => navigate(-1)}
                onCanceled={() => navigate(-1)}
            />
        </DynamicModuleLoader>
    );
};

export default memo(CreateEmployeePage);
