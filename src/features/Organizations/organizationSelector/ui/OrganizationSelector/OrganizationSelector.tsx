import { Organization } from "@/entities/Organization";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { getOrganizationDetailsForm } from "@/features/Organizations/organizationDetailsCard/model/selectors/organizationDetailsSelectors";
import { createOrganization } from "@/features/Organizations/organizationDetailsCard/model/services/createOrganization/createOrganization";
import { organizationDetailsReducer } from "@/features/Organizations/organizationDetailsCard/model/slice/organizationDetailsSlice";
import { OrganizationSimpleForm } from "@/features/Organizations/organizationSelector/ui/OrganizationSimpleForm/OrganizationSimpleForm";
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

    // Выбрка данных с сервера
    const dataFetcher = useCallback(() => {
        dispatch(fetchAllOrganizations({ replaceData: true }));
    }, [dispatch]);

    // Инициализация значений
    useInitialEffect(() => {
        if (!isInitialized) {
            dataFetcher();
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

    const onSaveOrganization = useCallback(async () => {
        if (organizationDetails) {
            // Создаем новую организацию
            const res = await dispatch(
                createOrganization({
                    organization: organizationDetails,
                    workspaceId: activeWorkspaceId,
                }),
            ).unwrap();

            // Получаем новый список
            dataFetcher();
            // Устанавливаем в качестве нового значения
            onValueChanged?.(res);

            // Закрываем окно
            setModalOpen(false);
        }
    }, [
        activeWorkspaceId,
        dataFetcher,
        dispatch,
        onValueChanged,
        organizationDetails,
    ]);

    const [form] = useForm();

    return (
        <>
            <ModalFormWrapper
                form={form}
                title={"Новая организация"}
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
                {...otherProps}
            />
        </>
    );
});
