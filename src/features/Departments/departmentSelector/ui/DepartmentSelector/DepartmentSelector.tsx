import { Department } from "@/entities/Department";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { DropdownSelector } from "@/shared/ui/DropdownSelector/DropdownSelector";
import { Flex } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
    getAllDepartments,
    getAllDepartmentsError,
    getAllDepartmentsIsInitialized,
    getAllDepartmentsIsLoading,
} from "../../model/selectors/allDepartmentsSelectors";
import { fetchAllDepartments } from "../../model/services/fetchAllDepartments/fetchAllDepartments";
import { allDepartmentsReducer } from "../../model/slice/allDepartmentsSlice";

interface DepartmentSelectorProps {
    className?: string;
    value: Department | undefined;
    onValueChanged: (value: Department | undefined) => void;
}

const reducers: ReducersList = {
    allDepartmentsSchema: allDepartmentsReducer,
};

const convertDepartmentToSelectObject = (
    department: Department | undefined,
) => {
    if (!department) {
        return [];
    }
    return [{ label: department.name, value: department.id }];
};

export const DepartmentSelector = memo((props: DepartmentSelectorProps) => {
    const { className, onValueChanged, value } = props;

    const dispatch = useAppDispatch();
    const isInitialized = useSelector(getAllDepartmentsIsInitialized);
    const isLoading = useSelector(getAllDepartmentsIsLoading);
    const error = useSelector(getAllDepartmentsError);
    const departments = useSelector(getAllDepartments.selectAll);

    // Список
    const options = useMemo(() => {
        return departments.map((department) => {
            return { label: department.name, value: department.id };
        });
    }, [departments]);

    // Выбрка данных с сервера
    const dataFetcher = useCallback(() => {
        dispatch(fetchAllDepartments({ replaceData: true }));
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

            const department = departments.find(
                (department) => department.id === id,
            );

            if (department) {
                // Пробрасываем наверх значение
                onValueChanged(department);
            }
        },
        [departments, onValueChanged],
    );

    return (
        <Flex vertical gap={8}>
            <DropdownSelector
                reducers={reducers}
                value={convertDepartmentToSelectObject(value)}
                isLoading={isLoading}
                onValueChanged={onChanged}
                options={options}
                error={error}
            />
        </Flex>
    );
});
