import { employeeDetailsReducer } from "@/entities/Employee/model/slice/employeeDetailsSlice";
import { EditEmployee } from "@/features/Employees/editEmployee";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface CreateEmployeePageProps {
    className?: string;
}

const reducers: ReducersList = {
    employeeDetailsSchema: employeeDetailsReducer,
};

const CreateEmployeePage = (props: CreateEmployeePageProps) => {
    const { className } = props;

    // const [form] = useForm();

    const navigate = useNavigate();

    // const dispatch = useAppDispatch();
    // const employeeDetailsForm = useSelector(getEmployeeDetailsForm);
    // const frmAvatar = useSelector(getEmployeeDetailsFormAvatar);
    // const activeWorkspaceId = useSelector(getUserActiveWorkspaceId);
    //
    // const onSave = useCallback(async () => {
    //     if (employeeDetailsForm) {
    //         try {
    //             // Создаем сотрудника
    //             const employee = await dispatch(
    //                 createEmployee({
    //                     employee: employeeDetailsForm,
    //                     workspaceId: activeWorkspaceId,
    //                 }),
    //             ).unwrap();
    //
    //             // Если сотрудник создан
    //             if (employee?.id) {
    //                 // Обновляем аватар
    //                 if (frmAvatar && employee.id) {
    //                     const blob = await fetch(frmAvatar).then((r) =>
    //                         r.blob(),
    //                     );
    //                     await dispatch(
    //                         updateEmployeeAvatar({
    //                             employeeId: employee.id,
    //                             file: blob,
    //                         }),
    //                     );
    //                 }
    //
    //                 // Получаем свежие данные сотрудника из БД
    //                 const updatedEmployee = await dispatch(
    //                     getEmployee({ id: employee.id }),
    //                 ).unwrap();
    //
    //                 // Добавляем в список сотрудников
    //                 dispatch(
    //                     employeesInfiniteListActions.addOne(updatedEmployee),
    //                 );
    //
    //                 navigate(-1);
    //             }
    //         } catch {}
    //     }
    // }, [activeWorkspaceId, dispatch, employeeDetailsForm, frmAvatar, navigate]);

    // return (
    //     <DynamicModuleLoader reducers={reducers}>
    //         <EditFormWrapper
    //             title={"Новый сотрудник"}
    //             form={form}
    //             onSaveClick={onSave}
    //             onBackClick={() => {}}
    //         >
    //             <EmployeeDetailsForm form={form} />
    //         </EditFormWrapper>
    //     </DynamicModuleLoader>
    // );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <EditEmployee
                onUpdated={() => navigate(-1)}
                onCanceled={() => navigate(-1)}
            />
        </DynamicModuleLoader>
    );
};

export default memo(CreateEmployeePage);
