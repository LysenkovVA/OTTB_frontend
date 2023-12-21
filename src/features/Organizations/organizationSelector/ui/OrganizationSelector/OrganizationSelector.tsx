import { Organization } from "@/entities/Organization";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { DropdownSelector } from "@/shared/ui/DropdownSelector/DropdownSelector";
import { Flex } from "antd";
import { memo, useCallback, useMemo } from "react";
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

const convertOrganizationToSelectObject = (
    organization: Organization | undefined,
) => {
    if (!organization) {
        return [];
    }
    return [{ label: organization.name, value: organization.id }];
};

export const OrganizationSelector = memo((props: OrganizationSelectorProps) => {
    const { className, onValueChanged, value } = props;

    const dispatch = useAppDispatch();
    const isInitialized = useSelector(getAllOrganizationsIsInitialized);
    const isLoading = useSelector(getAllOrganizationsIsLoading);
    const error = useSelector(getAllOrganizationsError);
    const organizations = useSelector(getAllOrganizations.selectAll);

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

    return (
        <Flex vertical gap={8}>
            <DropdownSelector
                reducers={reducers}
                value={convertOrganizationToSelectObject(value)}
                isLoading={isLoading}
                onValueChanged={onChanged}
                options={options}
                error={error}
            />
        </Flex>
    );
});
