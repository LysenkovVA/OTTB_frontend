import { organizationDetailsReducer } from "@/entities/Organization/model/slice/organizationDetailsSlice";
import { EditOrganization } from "@/features/Organizations/editOrganization";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface CreateOrganizationPageProps {
    className?: string;
}

const reducers: ReducersList = {
    organizationDetailsSchema: organizationDetailsReducer,
};

const CreateOrganizationPage = (props: CreateOrganizationPageProps) => {
    const { className } = props;

    const navigate = useNavigate();

    return (
        <DynamicModuleLoader reducers={reducers}>
            <EditOrganization
                onUpdated={() => navigate(-1)}
                onCanceled={() => navigate(-1)}
            />
        </DynamicModuleLoader>
    );
};

export default memo(CreateOrganizationPage);
