import {
    getInspectionType,
    getInspectionTypeDetails,
    InspectionType,
    inspectionTypeDetailsReducer,
} from "@/entities/InspectionType";
import { getUserActiveWorkspaceId } from "@/entities/User";
import {
    getInspectionTypesListError,
    getInspectionTypesListIsInitialized,
    getInspectionTypesListIsLoading,
    getInspectionTypesListSelectors,
} from "@/features/InspectionTypes/inspectionTypeSelector/model/selectors/inspectionTypeSelectorSelectors";
import { createInspectionType } from "@/features/InspectionTypes/inspectionTypeSelector/model/services/createInspectionType/createInspectionType";
import { fetchInspectionTypesList } from "@/features/InspectionTypes/inspectionTypeSelector/model/services/getInspectionTypesList/getInspectionTypesList";
import { updateInspectionType } from "@/features/InspectionTypes/inspectionTypeSelector/model/services/updateInspectionType/updateInspectionType";
import { inspectionTypesListReducer } from "@/features/InspectionTypes/inspectionTypeSelector/model/slice/inspectionTypesListSlice";
import { InspectionTypeForm } from "@/features/InspectionTypes/inspectionTypeSelector/ui/InspectionTypeForm/InspectionTypeForm";
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

interface InspectionTypeSelectorProps {
    className?: string;
    value?: InspectionType | undefined;
    onValueChanged?: (value: InspectionType | undefined) => void;
}

const reducers: ReducersList = {
    inspectionTypeSelectorSchema: inspectionTypesListReducer,
};

const reducersModal: ReducersList = {
    inspectionTypeDetailsSchema: inspectionTypeDetailsReducer,
};

const convertInspectionTypeToSelectObject = (
    inspectionType: InspectionType | undefined,
) => {
    if (!inspectionType) {
        return [];
    }
    return [{ label: inspectionType.value, value: inspectionType.id }];
};

export const InspectionTypeSelector = memo(
    (props: InspectionTypeSelectorProps) => {
        const { className, onValueChanged, value, ...otherProps } = props;

        const [form] = useForm();
        const [modalOpen, setModalOpen] = useState(false);

        const dispatch = useAppDispatch();
        const isInitialized = useSelector(getInspectionTypesListIsInitialized);
        const isLoading = useSelector(getInspectionTypesListIsLoading);
        const error = useSelector(getInspectionTypesListError);
        const inspectionTypes = useSelector(
            getInspectionTypesListSelectors.selectAll,
        );
        const inspectionTypeDetails = useSelector(getInspectionTypeDetails);
        const activeWorkspaceId = useSelector(getUserActiveWorkspaceId);

        // Список
        const options = useMemo(() => {
            return inspectionTypes.map((organization) => {
                return { label: organization.value, value: organization.id };
            });
        }, [inspectionTypes]);

        // Инициализация значений
        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(
                    fetchInspectionTypesList({
                        workspaceId: activeWorkspaceId,
                        replaceData: true,
                    }),
                );
            }
        });

        // Изменение значений селектора
        const onChanged = useCallback(
            (id: string | undefined) => {
                if (!id) {
                    onValueChanged?.(undefined);
                }

                const inspectionType = inspectionTypes.find(
                    (organization) => organization.id === id,
                );

                if (inspectionType) {
                    // Пробрасываем наверх значение
                    onValueChanged?.(inspectionType);
                }
            },
            [inspectionTypes, onValueChanged],
        );

        const onAddInspectionType = useCallback(() => {
            setModalOpen(true);
        }, []);

        const onEditInspectionType = useCallback(() => {
            if (value?.id) {
                dispatch(getInspectionType({ id: value?.id }));
                setModalOpen(true);
            } else {
                alert("Тип проверки не выбран!");
            }
        }, [dispatch, value?.id]);

        const onSaveInspectionType = useCallback(async () => {
            if (inspectionTypeDetails) {
                if (!inspectionTypeDetails.id) {
                    // Создаем новую организацию
                    const newInspectionType = await dispatch(
                        createInspectionType({
                            data: inspectionTypeDetails,
                            workspaceId: activeWorkspaceId,
                        }),
                    ).unwrap();

                    // Устанавливаем в качестве нового значения
                    onValueChanged?.(newInspectionType);
                } else {
                    // Обновляем организацию
                    await dispatch(
                        updateInspectionType({
                            id: inspectionTypeDetails.id,
                            data: inspectionTypeDetails,
                        }),
                    ).unwrap();
                }

                // Закрываем окно
                setModalOpen(false);
            }
        }, [
            activeWorkspaceId,
            dispatch,
            inspectionTypeDetails,
            onValueChanged,
        ]);

        return (
            <>
                <ModalFormWrapper
                    form={form}
                    title={
                        inspectionTypeDetails?.id
                            ? "Редактирование"
                            : "Новая организация"
                    }
                    isVisible={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    onSave={onSaveInspectionType}
                >
                    <DynamicModuleLoader reducers={reducersModal}>
                        <InspectionTypeForm form={form} />
                    </DynamicModuleLoader>
                </ModalFormWrapper>
                <DropdownSelector
                    reducers={reducers}
                    value={convertInspectionTypeToSelectObject(value)}
                    isLoading={isLoading}
                    onValueChanged={onChanged}
                    options={options}
                    error={error}
                    onAdd={onAddInspectionType}
                    onEdit={onEditInspectionType}
                    {...otherProps}
                />
            </>
        );
    },
);
