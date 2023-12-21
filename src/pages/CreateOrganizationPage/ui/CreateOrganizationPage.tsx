import { getUserActiveWorkspaceId } from "@/entities/User";
import { getOrganizationDetailsForm } from "@/features/Organizations/organizationDetailsCard/model/selectors/organizationDetailsSelectors";
import { createOrganization } from "@/features/Organizations/organizationDetailsCard/model/services/createOrganization/createOrganization";
import { organizationDetailsReducer } from "@/features/Organizations/organizationDetailsCard/model/slice/organizationDetailsSlice";
import { OrganizationDetailsForm } from "@/features/Organizations/organizationDetailsCard/ui/OrganizationDetailsForm/OrganizationDetailsForm";
import { organizationsInfiniteListActions } from "@/features/Organizations/organizationsInfiniteList/model/slice/organizationsInfiniteListSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
import { useForm } from "antd/es/form/Form";
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

    const [form] = useForm();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const organizationDetailsForm = useSelector(getOrganizationDetailsForm);
    const activeWorkspaceId = useSelector(getUserActiveWorkspaceId);

    const onSave = useCallback(async () => {
        if (organizationDetailsForm) {
            // Создаем новую организацию
            try {
                const organization = await dispatch(
                    createOrganization({
                        organization: organizationDetailsForm,
                        workspaceId: activeWorkspaceId,
                    }),
                ).unwrap();

                // Добавляем в список организаций
                dispatch(organizationsInfiniteListActions.addOne(organization));

                navigate(-1);
            } catch {}
        }
    }, [activeWorkspaceId, dispatch, navigate, organizationDetailsForm]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div
                className={classNames(cls.CreateOrganizationPage, {}, [
                    className,
                ])}
            >
                <EditFormWrapper
                    title={"Новая организация"}
                    form={form}
                    onSave={onSave}
                    onCancel={() => {}}
                >
                    <OrganizationDetailsForm form={form} />
                </EditFormWrapper>
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(CreateOrganizationPage);
