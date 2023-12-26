import {
    Berth,
    berthDetailsReducer,
    getBerthDetailsForm,
} from "@/entities/Berth";
import { getEmployeeDetailsForm } from "@/entities/Employee";
import { getUserActiveWorkspaceId } from "@/entities/User";
import {
    getAllBerthes,
    getAllBerthesError,
    getAllBerthesIsInitialized,
    getAllBerthesIsLoading,
} from "@/features/Berthes/berthSelector/model/selectors/berthesListSelectors";
import { createBerth } from "@/features/Berthes/berthSelector/model/services/createBerth/createBerth";
import { fetchAllBerthes } from "@/features/Berthes/berthSelector/model/services/fetchAllBerthes/fetchAllBerthes";
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
    const activeWorkspaceId = useSelector(getUserActiveWorkspaceId);
    // const employeeOrganization = useSelector(
    //     getEmployeeDetailsFormSelectedOrganization,
    // );
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);

    // Список
    const options = useMemo(() => {
        return berthes.map((berth) => {
            return { label: berth.value, value: berth.id };
        });
    }, [berthes]);

    // Выбрка данных с сервера
    const dataFetcher = useCallback(() => {
        dispatch(
            fetchAllBerthes({
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

    const onSave = useCallback(async () => {
        if (berthDetails) {
            // Создаем новую организацию
            const res = await dispatch(
                createBerth({
                    data: berthDetails,
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
        berthDetails,
        dataFetcher,
        dispatch,
        employeeDetailsForm?.organization?.id,
        onValueChanged,
    ]);

    return (
        <>
            <ModalFormWrapper
                form={form}
                title={"Новая должность"}
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
                disabled={isLoading || !!error}
                {...otherProps}
            />
        </>
    );
});
