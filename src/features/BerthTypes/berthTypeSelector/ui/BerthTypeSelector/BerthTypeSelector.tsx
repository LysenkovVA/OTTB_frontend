import {
    BerthType,
    berthTypeDetailsReducer,
    getBerthTypeDetailsForm,
} from "@/entities/BerthType";
import { getEmployeeDetailsForm } from "@/entities/Employee";
import { getUserActiveWorkspaceId } from "@/entities/User";
import {
    getBerthTypesListError,
    getBerthTypesListIsInitialized,
    getBerthTypesListIsLoading,
    getBerthTypesListSelectors,
} from "@/features/BerthTypes/berthTypeSelector/model/selectors/berthTypeListSelectors";
import { createBerthType } from "@/features/BerthTypes/berthTypeSelector/model/services/createBerthType/createBerthType";
import { getBerthTypesList } from "@/features/BerthTypes/berthTypeSelector/model/services/getBerthTypesList/getBerthtypesList";
import { berthTypesListReducer } from "@/features/BerthTypes/berthTypeSelector/model/slice/berthTypesListSlice";
import { BerthTypeForm } from "@/features/BerthTypes/berthTypeSelector/ui/BerthTypeForm/BerthTypeForm";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { DropdownSelector } from "@/shared/ui/DropdownSelector/DropdownSelector";
import { ModalFormWrapper } from "@/shared/ui/ModalFormWrapper";
import { SelectProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

type DDSelectorProps = Omit<
    SelectProps,
    "options" | "children" | "value" | "className"
>;

interface BerthTypeSelectorProps extends DDSelectorProps {
    className?: string;
    value?: BerthType | undefined;
    onValueChanged?: (value: BerthType | undefined) => void;
}

const reducers: ReducersList = {
    berthTypesListSchema: berthTypesListReducer,
};

const reducersModal: ReducersList = {
    berthTypeDetailsSchema: berthTypeDetailsReducer,
};

const convertBerthTypeToSelectObject = (berthType: BerthType | undefined) => {
    if (!berthType) {
        return [];
    }
    return [{ label: berthType.value, value: berthType.id }];
};

export const BerthTypeSelector = memo((props: BerthTypeSelectorProps) => {
    const { className, onValueChanged, value, ...otherProps } = props;

    const [form] = useForm();
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isInitialized = useSelector(getBerthTypesListIsInitialized);
    const isLoading = useSelector(getBerthTypesListIsLoading);
    const error = useSelector(getBerthTypesListError);
    const berthTypes = useSelector(getBerthTypesListSelectors.selectAll);
    const berthTypeDetails = useSelector(getBerthTypeDetailsForm);
    const activeWorkspaceId = useSelector(getUserActiveWorkspaceId);
    // const employeeOrganization = useSelector(
    //     getEmployeeDetailsFormSelectedOrganization,
    // );
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);

    // Список
    const options = useMemo(() => {
        return berthTypes.map((berthType) => {
            return { label: berthType.value, value: berthType.id };
        });
    }, [berthTypes]);

    // Выбрка данных с сервера
    const dataFetcher = useCallback(() => {
        dispatch(
            getBerthTypesList({
                workspaceId: activeWorkspaceId,
                organizationId: employeeDetailsForm?.organization?.id,
                replaceData: true,
            }),
        );
    }, [activeWorkspaceId, dispatch, employeeDetailsForm?.organization?.id]);

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

            const berthType = berthTypes.find(
                (berthType) => berthType.id === id,
            );

            if (berthType) {
                // Пробрасываем наверх значение
                onValueChanged?.(berthType);
            }
        },
        [berthTypes, onValueChanged],
    );

    const onAdd = useCallback(() => {
        setModalOpen(true);
    }, []);

    const onSave = useCallback(async () => {
        if (berthTypeDetails) {
            // Создаем новую организацию
            const res = await dispatch(
                createBerthType({
                    data: berthTypeDetails,
                    workspaceId: activeWorkspaceId,
                    organizationId: employeeDetailsForm?.organization?.id,
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
        berthTypeDetails,
        dataFetcher,
        dispatch,
        employeeDetailsForm?.organization?.id,
        onValueChanged,
    ]);

    return (
        <>
            <ModalFormWrapper
                form={form}
                title={"Новый тип должности"}
                isVisible={modalOpen}
                onCancel={() => setModalOpen(false)}
                onSave={onSave}
            >
                <DynamicModuleLoader reducers={reducersModal}>
                    <BerthTypeForm form={form} />
                </DynamicModuleLoader>
            </ModalFormWrapper>
            <DropdownSelector
                reducers={reducers}
                value={convertBerthTypeToSelectObject(value)}
                isLoading={isLoading}
                onValueChanged={onChanged}
                options={options}
                error={error}
                onAdd={onAdd}
                {...otherProps}
            />
        </>
    );
});