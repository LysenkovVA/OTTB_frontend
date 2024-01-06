import { Department } from "@/entities/Department";
import { getEmployeeDetailsForm } from "@/entities/Employee/model/selectors/getEmployeeDetails";
import { getUserActiveWorkspace } from "@/entities/User";
import { getDepartmentDetailsForm } from "@/features/Departments/departmentDetailsCard/model/selectors/departmentDetailsSelectors";
import { createDepartment } from "@/features/Departments/departmentDetailsCard/model/services/createDepartment/createDepartment";
import { getDepartment } from "@/features/Departments/departmentDetailsCard/model/services/getDepartment/getDepartment";
import { updateDepartment } from "@/features/Departments/departmentDetailsCard/model/services/updateDepartment/updateDepartment";
import { departmentDetailsReducer } from "@/features/Departments/departmentDetailsCard/model/slice/departmentDetailsSlice";
import { DepartmentForm } from "@/features/Departments/departmentDetailsCard/ui/DepartmentForm/DepartmentForm";
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
import {
    getAllDepartments,
    getAllDepartmentsError,
    getAllDepartmentsIsInitialized,
    getAllDepartmentsIsLoading,
} from "../../model/selectors/allDepartmentsSelectors";
import { fetchAllDepartments } from "../../model/services/fetchAllDepartments/fetchAllDepartments";
import { allDepartmentsReducer } from "../../model/slice/allDepartmentsSlice";

type DDSelectorProps = Omit<
    SelectProps,
    "options" | "children" | "value" | "className"
>;

interface DepartmentSelectorProps extends DDSelectorProps {
    className?: string;
    value: Department | undefined;
    onValueChanged: (value: Department | undefined) => void;
}

const reducers: ReducersList = {
    allDepartmentsSchema: allDepartmentsReducer,
};

const reducersModal: ReducersList = {
    departmentDetailsSchema: departmentDetailsReducer,
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
    const { className, onValueChanged, value, ...otherProps } = props;

    const [form] = useForm();
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isInitialized = useSelector(getAllDepartmentsIsInitialized);
    const isLoading = useSelector(getAllDepartmentsIsLoading);
    const error = useSelector(getAllDepartmentsError);
    const departments = useSelector(getAllDepartments.selectAll);
    const departmentDetails = useSelector(getDepartmentDetailsForm);
    const activeWorkspace = useSelector(getUserActiveWorkspace);
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);

    // Список
    const options = useMemo(() => {
        return departments.map((department) => {
            return { label: department.name, value: department.id };
        });
    }, [departments]);

    // Инициализация значений
    useInitialEffect(() => {
        if (!isInitialized) {
            dispatch(
                fetchAllDepartments({
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

    const onAddDepartment = useCallback(() => {
        setModalOpen(true);
    }, []);

    const onEditDepartment = useCallback(() => {
        if (value?.id) {
            dispatch(getDepartment({ id: value?.id }));
            setModalOpen(true);
        } else {
            alert("Подразделение не выбрано!");
        }
    }, [dispatch, value?.id]);

    const onSaveDepartment = useCallback(async () => {
        if (departmentDetails) {
            if (!departmentDetails.id) {
                // Создаем новую организацию
                const res = await dispatch(
                    createDepartment({
                        department: {
                            ...departmentDetails,
                        },
                        workspaceId: activeWorkspace?.id,
                    }),
                ).unwrap();

                // Устанавливаем в качестве нового значения
                onValueChanged?.(res);
            } else {
                // Обновляем
                await dispatch(
                    updateDepartment({
                        id: departmentDetails.id,
                        data: departmentDetails,
                    }),
                );
            }

            // Закрываем окно
            setModalOpen(false);
        } else {
            alert("Сначала нужно выбрать организацию!");
        }
    }, [activeWorkspace?.id, departmentDetails, dispatch, onValueChanged]);

    return (
        <>
            <ModalFormWrapper
                form={form}
                title={
                    departmentDetails?.id
                        ? "Редактирование"
                        : "Новое подразделение"
                }
                isVisible={modalOpen}
                onCancel={() => setModalOpen(false)}
                onSave={onSaveDepartment}
            >
                <DynamicModuleLoader reducers={reducersModal}>
                    <DepartmentForm form={form} />
                </DynamicModuleLoader>
            </ModalFormWrapper>
            <DropdownSelector
                reducers={reducers}
                value={convertDepartmentToSelectObject(value)}
                isLoading={isLoading}
                onValueChanged={onChanged}
                options={options}
                error={error}
                onAdd={onAddDepartment}
                onEdit={onEditDepartment}
                disabled={isLoading || !!error}
                {...otherProps}
            />
        </>
    );
});
