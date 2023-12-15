import { Berth } from "@/entities/Berth";
import {
    getAllBerthes,
    getAllBerthesError,
    getAllBerthesIsInitialized,
    getAllBerthesIsLoading,
} from "@/features/Berthes/berthSelector/model/selectors/allBerthesSelectors";
import { fetchAllBerthes } from "@/features/Berthes/berthSelector/model/services/fetchAllBerthes/fetchAllBerthes";
import { allBerthesReducer } from "@/features/Berthes/berthSelector/model/slice/allBerthesSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { DropdownSelector } from "@/shared/ui/DropdownSelector/DropdownSelector";
import { Flex } from "antd";
import { memo, useCallback, useMemo } from "react";
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

    const dispatch = useAppDispatch();
    const isInitialized = useSelector(getAllBerthesIsInitialized);
    const isLoading = useSelector(getAllBerthesIsLoading);
    const error = useSelector(getAllBerthesError);
    const berthes = useSelector(getAllBerthes.selectAll);

    // Список
    const options = useMemo(() => {
        return berthes.map((berth) => {
            return { label: berth.value, value: berth.id };
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
                />
            </Flex>
        </div>
    );
});
