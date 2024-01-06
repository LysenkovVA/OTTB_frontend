import {
    ConstructionObject,
    constructionObjectDetailsReducer,
    getConstructionObject,
    getConstructionObjectDetailsForm,
} from "@/entities/ConstructionObject";
import { getUserActiveWorkspace } from "@/entities/User";
import {
    getConstructionObjects,
    getConstructionObjectsError,
    getConstructionObjectsIsInitialized,
    getConstructionObjectsIsLoading,
} from "@/features/ConstructionObjects/constructionObjectSelector/model/selectors/consturctionObjectsListSelectors";
import { createConstructionObject } from "@/features/ConstructionObjects/constructionObjectSelector/model/services/createConstructionObject/createConstructionObject";
import { fetchAllConstructionObjects } from "@/features/ConstructionObjects/constructionObjectSelector/model/services/fetchAllConstructionObjects/fetchAllConstructionObjects";
import { updateConstructionObject } from "@/features/ConstructionObjects/constructionObjectSelector/model/services/updateConstructionObject/updateConstructionObject";
import { constructionObjectsListReducer } from "@/features/ConstructionObjects/constructionObjectSelector/model/slice/constructionObjectsListSlice";
import { ConstructionObjectForm } from "@/features/ConstructionObjects/constructionObjectSelector/ui/ConstructionObjectForm/ConstructionObjectForm";
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

interface ConstructionObjectSelectorProps extends DDSelectorProps {
    className?: string;
    value?: ConstructionObject | undefined;
    onValueChanged?: (value: ConstructionObject | undefined) => void;
}

const reducers: ReducersList = {
    constructionObjectSelectorSchema: constructionObjectsListReducer,
};

const reducersModal: ReducersList = {
    constructionObjectDetailsSchema: constructionObjectDetailsReducer,
};

const convertConstructionObjectToSelectObject = (
    value: ConstructionObject | undefined,
) => {
    if (!value) {
        return [];
    }
    return [{ label: value.name, value: value.id }];
};

export const ConstructionObjectSelector = memo(
    (props: ConstructionObjectSelectorProps) => {
        const { className, onValueChanged, value, ...otherProps } = props;

        const [form] = useForm();
        const [modalOpen, setModalOpen] = useState(false);

        const dispatch = useAppDispatch();
        const isInitialized = useSelector(getConstructionObjectsIsInitialized);
        const isLoading = useSelector(getConstructionObjectsIsLoading);
        const error = useSelector(getConstructionObjectsError);
        const constructionObjects = useSelector(
            getConstructionObjects.selectAll,
        );
        const coDetails = useSelector(getConstructionObjectDetailsForm);
        const activeWorkspace = useSelector(getUserActiveWorkspace);

        // Список
        const options = useMemo(() => {
            return constructionObjects.map((item) => {
                return { label: item.name, value: item.id };
            });
        }, [constructionObjects]);

        // Инициализация значений
        useInitialEffect(() => {
            if (!isInitialized) {
                dispatch(
                    fetchAllConstructionObjects({
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

                const item = constructionObjects.find((item) => item.id === id);

                if (item) {
                    // Пробрасываем наверх значение
                    onValueChanged?.(item);
                }
            },
            [constructionObjects, onValueChanged],
        );

        const onAdd = useCallback(() => {
            setModalOpen(true);
        }, []);

        const onEditConstructionObject = useCallback(() => {
            if (value?.id) {
                dispatch(getConstructionObject({ id: value?.id }));
                setModalOpen(true);
            } else {
                alert("Объект не выбран!");
            }
        }, [dispatch, value?.id]);

        const onSave = useCallback(async () => {
            if (coDetails) {
                if (!coDetails.id) {
                    // Создаем
                    const res = await dispatch(
                        createConstructionObject({
                            data: coDetails,
                            workspaceId: activeWorkspace?.id,
                        }),
                    ).unwrap();

                    // Устанавливаем в качестве нового значения
                    onValueChanged?.(res);
                } else {
                    // Обновляем
                    await dispatch(
                        updateConstructionObject({
                            id: coDetails.id,
                            data: coDetails,
                        }),
                    );
                }

                // Закрываем окно
                setModalOpen(false);
            } else {
                alert("Сначала нужно выбрать организацию!");
            }
        }, [activeWorkspace?.id, coDetails, dispatch, onValueChanged]);

        return (
            <>
                <ModalFormWrapper
                    form={form}
                    title={coDetails?.id ? "Редактирование" : "Новый объект"}
                    isVisible={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    onSave={onSave}
                >
                    <DynamicModuleLoader reducers={reducersModal}>
                        <ConstructionObjectForm form={form} />
                    </DynamicModuleLoader>
                </ModalFormWrapper>
                <DropdownSelector
                    reducers={reducers}
                    value={convertConstructionObjectToSelectObject(value)}
                    isLoading={isLoading}
                    onValueChanged={onChanged}
                    options={options}
                    error={error}
                    onAdd={onAdd}
                    onEdit={onEditConstructionObject}
                    disabled={isLoading || !!error}
                    {...otherProps}
                />
            </>
        );
    },
);
