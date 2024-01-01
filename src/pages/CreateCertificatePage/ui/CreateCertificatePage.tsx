import { certificateDetailsReducer } from "@/entities/Certificate/model/slice/certificateDetailsSlice";
import { EditCertificate } from "@/features/Certificates/editCertificate";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

export interface CreateCertificatePageProps {
    className?: string;
}

const reducers: ReducersList = {
    certificateDetailsSchema: certificateDetailsReducer,
};
const CreateCertificatePage = (props: CreateCertificatePageProps) => {
    const { className } = props;

    const navigate = useNavigate();

    return (
        <DynamicModuleLoader reducers={reducers}>
            <EditCertificate
                onUpdated={() => navigate(-1)}
                onCanceled={() => navigate(-1)}
            />
        </DynamicModuleLoader>
    );
};

export default memo(CreateCertificatePage);
