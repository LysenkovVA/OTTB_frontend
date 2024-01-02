import { inspectionDetailsReducer } from "@/entities/Inspection/model/slice/inspectionDetailsSlice";
import { EditInspection } from "@/features/Inspections/editInspection";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface CreateInspectionPageProps {
    className?: string;
}

const reducers: ReducersList = {
    inspectionDetailsSchema: inspectionDetailsReducer,
};

const CreateInspectionPage = (props: CreateInspectionPageProps) => {
    const { className } = props;

    const navigate = useNavigate();

    return (
        <DynamicModuleLoader reducers={reducers}>
            <EditInspection
                onUpdated={() => navigate(-1)}
                onCanceled={() => navigate(-1)}
            />
        </DynamicModuleLoader>
    );
};

export default memo(CreateInspectionPage);
