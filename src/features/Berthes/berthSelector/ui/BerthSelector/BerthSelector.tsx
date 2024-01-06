import {
    Berth,
    berthDetailsReducer,
    getBerth,
    getBerthDetailsForm,
} from "@/entities/Berth";
import { getUserActiveWorkspace } from "@/entities/User";
import {
    getAllBerthes,
    getAllBerthesError,
    getAllBerthesIsInitialized,
    getAllBerthesIsLoading,
} from "@/features/Berthes/berthSelector/model/selectors/berthesListSelectors";
import { createBerth } from "@/features/Berthes/berthSelector/model/services/createBerth/createBerth";
import { fetchAllBerthes } from "@/features/Berthes/berthSelector/model/services/fetchAllBerthes/fetchAllBerthes";
import { updateBerth } from "@/features/Berthes/berthSelector/model/services/updateBerth/updateBerth";
import { BerthesListReducer } from "@/features/Berthes/berthSelector/model/slice/berthesListSlice";
import { BerthForm } from "@/features/Berthes/berthSelector/ui/BerthForm/BerthForm";
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

interface BerthSelectorProps extends DDSelectorProps {
    className?: string;
    value?: Berth | undefined;
    onValueChanged?: (value: Berth | undefined) => void;
}

const reducers: ReducersList = {
    allBerthesSchema: BerthesListReducer,
};

const reducersModal: ReducersList = {
    berthDetailsSchema: berthDetailsReducer,
};

const convertBerthToSelectObject = (berth: Berth | undefined) => {
    if (!berth) {
        return [];
    }
    return [{ label: berth.value, value: berth.id }];
};

export const BerthSelector = memo((props: BerthSelectorProps) => {
    const { className, onValueChanged, value, ...otherProps } = props;

    const [form] = useForm();
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isInitialized = useSelector(getAllBerthesIsInitialized);
    const isLoading = useSelector(getAllBerthesIsLoading);
    const error = useSelector(getAllBerthesError);
    const berthes = useSelector(getAllBerthes.selectAll);
    const berthDetails = useSelector(getBerthDetailsForm);
    const activeWorkspace = useSelector(getUserActiveWorkspace);

    // Список
    const options = useMemo(() => {
        return berthes.map((berth) => {
            return { label: berth.value, value: berth.id };
        });
    }, [berthes]);

    // Инициализация значений
    useInitialEffect(() => {
        if (!isInitialized) {
            dispatch(
                fetchAllBerthes({
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

            const berth = berthes.find((berth) => berth.id === id);

            if (berth) {
                // Пробрасываем наверх значение
                onValueChanged?.(berth);
            }
        },
        [berthes, onValueChanged],
    );

    const onAdd = useCallback(() => {
        setModalOpen(true);
    }, []);

    const onEditBerth = useCallback(() => {
        if (value?.id) {
            dispatch(getBerth({ id: value?.id }));
            setModalOpen(true);
        } else {
            alert("Должность не выбрана!");
        }
    }, [dispatch, value?.id]);

    const onSave = useCallback(async () => {
        if (berthDetails) {
            if (!berthDetails.id) {
                // Создаем
                const res = await dispatch(
                    createBerth({
                        data: berthDetails,
                        workspaceId: activeWorkspace?.id,
                    }),
                ).unwrap();

                // Устанавливаем в качестве нового значения
                onValueChanged?.(res);
            } else {
                // Обновляем
                await dispatch(
                    updateBerth({
                        id: berthDetails.id,
                        data: berthDetails,
                    }),
                );
            }

            // Закрываем окно
            setModalOpen(false);
        } else {
            alert("Сначала нужно выбрать организацию!");
        }
    }, [activeWorkspace?.id, berthDetails, dispatch, onValueChanged]);

    return (
        <>
            <ModalFormWrapper
                form={form}
                title={berthDetails?.id ? "Редактирование" : "Новая должность"}
                isVisible={modalOpen}
                onCancel={() => setModalOpen(false)}
                onSave={onSave}
            >
                <DynamicModuleLoader reducers={reducersModal}>
                    <BerthForm form={form} />
                </DynamicModuleLoader>
            </ModalFormWrapper>
            <DropdownSelector
                reducers={reducers}
                value={convertBerthToSelectObject(value)}
                isLoading={isLoading}
                onValueChanged={onChanged}
                options={options}
                error={error}
                onAdd={onAdd}
                onEdit={onEditBerth}
                disabled={isLoading || !!error}
                {...otherProps}
            />
        </>
    );
});
