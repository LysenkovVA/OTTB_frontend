import { getOrganizationDetailsForm } from "@/features/Organizations/organizationDetailsCard/model/selectors/organizationDetailsSelectors";
import { createOrganization } from "@/features/Organizations/organizationDetailsCard/model/services/createOrganization/createOrganization";
import { organizationDetailsReducer } from "@/features/Organizations/organizationDetailsCard/model/slice/organizationDetailsSlice";
import { OrganizationDetailsForm } from "@/features/Organizations/organizationDetailsCard/ui/OrganizationDetailsForm/OrganizationDetailsForm";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./CreateOrganizationPage.module.scss";

interface CreateOrganizationPageProps {
    className?: string;
}

const reducers: ReducersList = {
    organizationDetailsSchema: organizationDetailsReducer,
};

const CreateOrganizationPage = (props: CreateOrganizationPageProps) => {
    const { className } = props;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const organizationDetailsForm = useSelector(getOrganizationDetailsForm);

    const onSave = useCallback(async () => {
        if (organizationDetailsForm) {
            // Создаем новую организацию
            try {
                await dispatch(
                    createOrganization({
                        organization: organizationDetailsForm,
                    }),
                );

                navigate(-1);
            } catch {}
        }
    }, [dispatch, navigate, organizationDetailsForm]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div
                className={classNames(cls.CreateOrganizationPage, {}, [
                    className,
                ])}
            >
                <OrganizationDetailsForm
                    onSave={onSave}
                    onCancel={() => navigate(-1)}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(CreateOrganizationPage);
