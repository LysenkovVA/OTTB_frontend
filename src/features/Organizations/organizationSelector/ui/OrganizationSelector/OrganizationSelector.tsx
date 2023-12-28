import { getOrganization, Organization } from "@/entities/Organization";
import { getOrganizationDetailsForm } from "@/entities/Organization/model/selectors/organizationDetailsSelectors";
import { organizationDetailsReducer } from "@/entities/Organization/model/slice/organizationDetailsSlice";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { OrganizationSimpleForm } from "@/features/Organizations/organizationSelector/ui/OrganizationSimpleForm/OrganizationSimpleForm";
import { updateOrganization } from "@/features/Organizations/organizationsInfiniteList";
import { createOrganization } from "@/features/Organizations/organizationsInfiniteList/model/services/createOrganization/createOrganization";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { DropdownSelector } from "@/shared/ui/DropdownSelector/DropdownSelector";
import { ModalFormWrapper } from "@/shared/ui/ModalFormWrapper";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
    getAllOrganizations,
    getAllOrganizationsError,
    getAllOrganizationsIsInitialized,
    getAllOrganizationsIsLoading,
} from "../../model/selectors/allOrganizationsSelectors";
import { fetchAllOrganizations } from "../../model/services/fetchAllOrganizations/fetchAllOrganizations";
import { allOrganizationsReducer } from "../../model/slice/allOrganizationsSlice";

interface OrganizationSelectorProps {
    className?: string;
    value?: Organization | undefined;
    onValueChanged?: (value: Organization | undefined) => void;
}

const reducers: ReducersList = {
    allOrganizationsSchema: allOrganizationsReducer,
};

const reducersModal: ReducersList = {
    organizationDetailsSchema: organizationDetailsReducer,
};

const convertOrganizationToSelectObject = (
    organization: Organization | undefined,
) => {
    if (!organization) {
        return [];
    }
    return [{ label: organization.name, value: organization.id }];
};

export const OrganizationSelector = memo((props: OrganizationSelectorProps) => {
    const { className, onValueChanged, value, ...otherProps } = props;

    const [form] = useForm();
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isInitialized = useSelector(getAllOrganizationsIsInitialized);
    const isLoading = useSelector(getAllOrganizationsIsLoading);
    const error = useSelector(getAllOrganizationsError);
    const organizations = useSelector(getAllOrganizations.selectAll);
    const organizationDetails = useSelector(getOrganizationDetailsForm);
    const activeWorkspaceId = useSelector(getUserActiveWorkspaceId);

    // Список
    const options = useMemo(() => {
        return organizations.map((organization) => {
            return { label: organization.name, value: organization.id };
        });
    }, [organizations]);

    // Инициализация значений
    useInitialEffect(() => {
        if (!isInitialized) {
            dispatch(fetchAllOrganizations({ replaceData: true }));
        }
    });

    // Изменение значений селектора
    const onChanged = useCallback(
        (id: string | undefined) => {
            if (!id) {
                onValueChanged?.(undefined);
            }

            const organization = organizations.find(
                (organization) => organization.id === id,
            );

            if (organization) {
                // Пробрасываем наверх значение
                onValueChanged?.(organization);
            }
        },
        [organizations, onValueChanged],
    );

    const onAddOrganization = useCallback(() => {
        setModalOpen(true);
    }, []);

    const onEditOrganization = useCallback(() => {
        if (value?.id) {
            dispatch(getOrganization({ id: value?.id }));
            setModalOpen(true);
        } else {
            alert("Организация не выбрана!");
        }
    }, [dispatch, value?.id]);

    const onSaveOrganization = useCallback(async () => {
        if (organizationDetails) {
            if (!organizationDetails.id) {
                // Создаем новую организацию
                const newOrganization = await dispatch(
                    createOrganization({
                        data: organizationDetails,
                        workspaceId: activeWorkspaceId,
                    }),
                ).unwrap();

                // Устанавливаем в качестве нового значения
                onValueChanged?.(newOrganization);
            } else {
                // Обновляем организацию
                await dispatch(
                    updateOrganization({
                        id: organizationDetails.id,
                        data: organizationDetails,
                    }),
                ).unwrap();
            }

            // Закрываем окно
            setModalOpen(false);
        }
    }, [activeWorkspaceId, dispatch, onValueChanged, organizationDetails]);

    return (
        <>
            <ModalFormWrapper
                form={form}
                title={
                    organizationDetails?.id
                        ? "Редактирование"
                        : "Новая организация"
                }
                isVisible={modalOpen}
                onCancel={() => setModalOpen(false)}
                onSave={onSaveOrganization}
            >
                <DynamicModuleLoader reducers={reducersModal}>
                    <OrganizationSimpleForm form={form} />
                </DynamicModuleLoader>
            </ModalFormWrapper>
            <DropdownSelector
                reducers={reducers}
                value={convertOrganizationToSelectObject(value)}
                isLoading={isLoading}
                onValueChanged={onChanged}
                options={options}
                error={error}
                onAdd={onAddOrganization}
                onEdit={onEditOrganization}
                {...otherProps}
            />
        </>
    );
});
