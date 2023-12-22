import { Department } from "@/entities/Department";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { getDepartmentDetailsForm } from "@/features/Departments/departmentDetailsCard/model/selectors/departmentDetailsSelectors";
import { createDepartment } from "@/features/Departments/departmentDetailsCard/model/services/createDepartment/createDepartment";
import { departmentDetailsReducer } from "@/features/Departments/departmentDetailsCard/model/slice/departmentDetailsSlice";
import { DepartmentForm } from "@/features/Departments/departmentDetailsCard/ui/DepartmentForm/DepartmentForm";
import { getEmployeeDetailsFormSelectedOrganization } from "@/features/Employees/employeeDetailsCard/model/selectors/getEmployeeDetails";
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

const convertDepartmentToSelectObject = (
    department: Department | undefined,
) => {
    if (!department) {
        return [];
    }
    return [{ label: department.name, value: department.id }];
};

const reducersModal: ReducersList = {
    departmentDetailsSchema: departmentDetailsReducer,
};

export const DepartmentSelector = memo((props: DepartmentSelectorProps) => {
    const { className, onValueChanged, value, ...otherProps } = props;

    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isInitialized = useSelector(getAllDepartmentsIsInitialized);
    const isLoading = useSelector(getAllDepartmentsIsLoading);
    const error = useSelector(getAllDepartmentsError);
    const departments = useSelector(getAllDepartments.selectAll);
    const departmentDetails = useSelector(getDepartmentDetailsForm);
    const activeWorkspaceId = useSelector(getUserActiveWorkspaceId);
    const employeeOrganization = useSelector(
        getEmployeeDetailsFormSelectedOrganization,
    );

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

    const onAddDepartment = useCallback(() => {
        setModalOpen(true);
    }, []);

    const onSaveDepartment = useCallback(async () => {
        if (departmentDetails && employeeOrganization) {
            // Создаем новую организацию
            const res = await dispatch(
                createDepartment({
                    department: {
                        ...departmentDetails,
                        organization: { ...employeeOrganization },
                    },
                    workspaceId: activeWorkspaceId,
                }),
            ).unwrap();

            // Получаем новый список
            dataFetcher();
            // Устанавливаем в качестве нового значения
            onValueChanged?.(res);

            // Закрываем окно
            setModalOpen(false);
        } else {
            alert("Сначала нужно выбрать организацию!");
        }
    }, [
        activeWorkspaceId,
        dataFetcher,
        departmentDetails,
        dispatch,
        employeeOrganization,
        onValueChanged,
    ]);

    const [form] = useForm();

    return (
        <>
            <ModalFormWrapper
                form={form}
                title={"Новое подразделение"}
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
                {...otherProps}
            />
        </>
    );
});
