import { Berth } from "@/entities/Berth";
import { getUserActiveWorkspaceId } from "@/entities/User";
import {
    getAllBerthes,
    getAllBerthesError,
    getAllBerthesIsInitialized,
    getAllBerthesIsLoading,
} from "@/features/Berthes/berthSelector/model/selectors/allBerthesSelectors";
import { createBerth } from "@/features/Berthes/berthSelector/model/services/createBerth/createBerth";
import { fetchAllBerthes } from "@/features/Berthes/berthSelector/model/services/fetchAllBerthes/fetchAllBerthes";
import { allBerthesReducer } from "@/features/Berthes/berthSelector/model/slice/allBerthesSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { DropdownSelector } from "@/shared/ui/DropdownSelector/DropdownSelector";
import { Flex, Form, Input, Modal } from "antd";
import { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import cls from "./BerthSelector.module.scss";

interface BerthSelectorProps {
    className?: string;
    value: Berth | undefined;
    onValueChanged: (value: Berth | undefined) => void;
}

const reducers: ReducersList = {
    allBerthesSchema: allBerthesReducer,
};

const convertBerthToSelectObject = (berth: Berth | undefined) => {
    if (!berth) {
        return [];
    }
    return [{ label: berth.value, value: berth.id }];
};

export const BerthSelector = memo((props: BerthSelectorProps) => {
    const { className, onValueChanged, value } = props;

    const [modalOpen, setModalOpen] = useState(false);
    const [newBerth, setNewBerth] = useState<string>("");

    const dispatch = useAppDispatch();
    const isInitialized = useSelector(getAllBerthesIsInitialized);
    const isLoading = useSelector(getAllBerthesIsLoading);
    const error = useSelector(getAllBerthesError);
    const berthes = useSelector(getAllBerthes.selectAll);
    const activeWorkspaceId = useSelector(getUserActiveWorkspaceId);

    // Список
    const options = useMemo(() => {
        return berthes.map((berth) => {
            return { label: berth.value, value: berth.id! };
        });
    }, [berthes]);

    // Выбрка данных с сервера
    const dataFetcher = useCallback(() => {
        dispatch(fetchAllBerthes({ replaceData: true }));
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
                onValueChanged(undefined);
            }

            const berth = berthes.find((berth) => berth.id === id);

            if (berth) {
                // Пробрасываем наверх значение
                onValueChanged(berth);
            }
        },
        [berthes, onValueChanged],
    );

    const onAdd = useCallback(() => {
        setModalOpen(true);
    }, []);

    const onSave = useCallback(() => {
        // TODO добавляем в БД
        dispatch(
            createBerth({
                berth: { id: "", value: newBerth },
                workspaceId: activeWorkspaceId,
            }),
        );

        dispatch(fetchAllBerthes({ replaceData: true }));

        setModalOpen(false);
        setNewBerth("");
    }, [activeWorkspaceId, dispatch, newBerth]);

    const onCancel = useCallback(() => {
        setModalOpen(false);
        setNewBerth("");
    }, []);

    const modalDialog = (
        <Modal
            title="Новая должность"
            centered
            open={modalOpen}
            onOk={onSave}
            onCancel={onCancel}
            okText={"Сохранить"}
            cancelText={"Отмена"}
        >
            <Form key={"modalForm"}>
                <Form.Item>
                    <Input onChange={(e) => setNewBerth(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );

    return (
        <div className={classNames(cls.BerthSelector, {}, [className])}>
            <Flex gap={4}>
                <DropdownSelector
                    className={cls.selector}
                    reducers={reducers}
                    value={convertBerthToSelectObject(value)}
                    isLoading={isLoading}
                    onValueChanged={onChanged}
                    options={options}
                    error={error}
                    onAdd={onAdd}
                />
                {modalDialog}
            </Flex>
        </div>
    );
});
