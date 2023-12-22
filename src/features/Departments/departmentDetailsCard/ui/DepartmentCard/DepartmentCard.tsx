import { departmentsInfiniteListActions } from "@/features/Departments/departmentsInfiniteList/model/slice/departmentsInfiniteListSlice";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
import { ViewWrapper } from "@/shared/ui/ViewWrapper";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getDepartmentDetails,
    getDepartmentDetailsForm,
    getDepartmentDetailsIsDataLoading,
    getDepartmentDetailsIsInitialized,
} from "../../model/selectors/departmentDetailsSelectors";
import { deleteDepartment } from "../../model/services/deleteDepartment/deleteEmployee";
import { getDepartment } from "../../model/services/getDepartment/getDepartment";
import { updateDepartment } from "../../model/services/updateDepartment/updateDepartment";
import {
    departmentDetailsActions,
    departmentDetailsReducer,
} from "../../model/slice/departmentDetailsSlice";
import { DepartmentForm } from "../DepartmentForm/DepartmentForm";
import { DepartmentView } from "../DepartmentView/DepartmentView";

export interface DepartmentCardProps {
    className?: string;
}

const reducers: ReducersList = {
    departmentDetailsSchema: departmentDetailsReducer,
};

export const DepartmentCard = memo((props: DepartmentCardProps) => {
    const { className } = props;

    const [form] = useForm();
    const navigate = useNavigate();

    const [isEditMode, setIsEditMode] = useState(false);

    const { id: departmentId } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getDepartmentDetailsIsDataLoading);
    const isInitialized = useSelector(getDepartmentDetailsIsInitialized);
    const departmentDetails = useSelector(getDepartmentDetails);
    const departmentDetailsForm = useSelector(getDepartmentDetailsForm);

    useInitialEffect(() => {
        if (!isInitialized && !isLoading && departmentId) {
            dispatch(getDepartment({ id: departmentId }));
        }
    });

    const onSave = useCallback(async () => {
        if (departmentDetailsForm) {
            try {
                await dispatch(
                    updateDepartment({
                        department: departmentDetailsForm,
                    }),
                );

                setIsEditMode(false);
                // Возврат к списку
                navigate(-1);
            } catch {}
        }
    }, [departmentDetailsForm, dispatch, navigate]);

    const onCancel = useCallback(() => {
        if (departmentDetails) {
            dispatch(departmentDetailsActions.setFormData(departmentDetails));
        }

        setIsEditMode(false);
    }, [dispatch, departmentDetails]);

    const onDelete = useCallback(async () => {
        if (departmentId) {
            try {
                await dispatch(deleteDepartment({ departmentId }));
                dispatch(
                    departmentsInfiniteListActions.removeOne(departmentId),
                );
                navigate(-1);
            } catch {}
        }
    }, [dispatch, navigate, departmentId]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            {isEditMode ? (
                <EditFormWrapper
                    title={`${departmentDetails?.name}`}
                    form={form}
                    onSave={onSave}
                    onCancel={onCancel}
                >
                    <DepartmentForm form={form} />
                </EditFormWrapper>
            ) : (
                <ViewWrapper
                    title={`${departmentDetails?.name}`}
                    deleteText={`Удалить ${departmentDetails?.name}?`}
                    onEditClick={() => setIsEditMode(true)}
                    onDeleteClick={onDelete}
                >
                    <DepartmentView />
                </ViewWrapper>
            )}
        </DynamicModuleLoader>
    );
});
