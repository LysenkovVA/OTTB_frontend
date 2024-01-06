import {
    CertificateType,
    certificateTypeDetailsReducer,
    getCertificateType,
    getCertificateTypeDetailsForm,
} from "@/entities/CertificateType";
import { getUserActiveWorkspace } from "@/entities/User";

import {
    getCertificateTypesListError,
    getCertificateTypesListIsInitialized,
    getCertificateTypesListIsLoading,
    getCertificateTypesListSelectors,
} from "@/features/CertificateTypes/certificateTypeSelector/model/selectors/certificateTypeListSelectors";
import { createCertificateType } from "@/features/CertificateTypes/certificateTypeSelector/model/services/createCertificateType/createCertificateType";
import { getCertificateTypesList } from "@/features/CertificateTypes/certificateTypeSelector/model/services/getCertificateTypesList/getCertificateTypesList";
import { updateCertificateType } from "@/features/CertificateTypes/certificateTypeSelector/model/services/updateCertificateType/updateCertificateType";
import { certificateTypesListReducer } from "@/features/CertificateTypes/certificateTypeSelector/model/slice/certificateTypesListSlice";
import { CertificateTypeForm } from "@/features/CertificateTypes/certificateTypeSelector/ui/CertificateTypeForm/CertificateTypeForm";
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

interface CertificateTypeSelectorProps extends DDSelectorProps {
    className?: string;
    value?: CertificateType | undefined;
    onValueChanged?: (value: CertificateType | undefined) => void;
}

const reducers: ReducersList = {
    certificateTypesListSchema: certificateTypesListReducer,
};

const reducersModal: ReducersList = {
    certificateTypeDetailsSchema: certificateTypeDetailsReducer,
};

const convertCertificateTypeToSelectObject = (
    certificateType: CertificateType | undefined,
) => {
    if (!certificateType) {
        return [];
    }
    return [{ label: certificateType.value, value: certificateType.id }];
};

export const CertificateTypeSelector = memo(
    (props: CertificateTypeSelectorProps) => {
        const { className, onValueChanged, value, ...otherProps } = props;

        const [form] = useForm();
        const [modalOpen, setModalOpen] = useState(false);

        const dispatch = useAppDispatch();
        const isInitialized = useSelector(getCertificateTypesListIsInitialized);
        const isLoading = useSelector(getCertificateTypesListIsLoading);
        const error = useSelector(getCertificateTypesListError);
        const certificateTypes = useSelector(
            getCertificateTypesListSelectors.selectAll,
        );
        const certificateTypeDetails = useSelector(
            getCertificateTypeDetailsForm,
        );
        const activeWorkspace = useSelector(getUserActiveWorkspace);
        // const employeeDetailsForm = useSelector(getEmployeeDetailsForm);

        // Список
        const options = useMemo(() => {
            return certificateTypes.map((ct) => {
                return { label: ct.value, value: ct.id };
            });
        }, [certificateTypes]);

        // Инициализация значений
        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(
                    getCertificateTypesList({
                        workspaceId: activeWorkspace?.id,
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

                const ct = certificateTypes.find((ct) => ct.id === id);

                if (ct) {
                    // Пробрасываем наверх значение
                    onValueChanged?.(ct);
                }
            },
            [certificateTypes, onValueChanged],
        );

        const onAdd = useCallback(() => {
            setModalOpen(true);
        }, []);

        const onEditCertificateType = useCallback(() => {
            if (value?.id) {
                dispatch(getCertificateType({ id: value.id }));
                setModalOpen(true);
            } else {
                alert("Тип удостоверения не выбран!");
            }
        }, [dispatch, value?.id]);

        const onSave = useCallback(async () => {
            if (certificateTypeDetails) {
                if (!certificateTypeDetails.id) {
                    // Создаем
                    const res = await dispatch(
                        createCertificateType({
                            data: certificateTypeDetails,
                            workspaceId: activeWorkspace?.id,
                        }),
                    ).unwrap();

                    // Устанавливаем в качестве нового значения
                    onValueChanged?.(res);
                } else {
                    // Обновляем
                    await dispatch(
                        updateCertificateType({
                            id: certificateTypeDetails.id,
                            data: certificateTypeDetails,
                        }),
                    );
                }

                // Закрываем окно
                setModalOpen(false);
            }
        }, [
            activeWorkspace?.id,
            certificateTypeDetails,
            dispatch,
            onValueChanged,
        ]);

        return (
            <>
                <ModalFormWrapper
                    form={form}
                    title={
                        certificateTypeDetails?.id
                            ? "Редактирование"
                            : "Новый тип удостоверения"
                    }
                    isVisible={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    onSave={onSave}
                >
                    <DynamicModuleLoader reducers={reducersModal}>
                        <CertificateTypeForm form={form} />
                    </DynamicModuleLoader>
                </ModalFormWrapper>
                <DropdownSelector
                    placeholder={""}
                    reducers={reducers}
                    value={convertCertificateTypeToSelectObject(value)}
                    isLoading={isLoading}
                    onValueChanged={onChanged}
                    options={options}
                    error={error}
                    onAdd={onAdd}
                    onEdit={onEditCertificateType}
                    {...otherProps}
                />
            </>
        );
    },
);
