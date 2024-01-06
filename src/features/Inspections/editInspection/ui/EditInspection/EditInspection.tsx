import { getInspectionDetailsForm } from "@/entities/Inspection/model/selectors/inspectionDetailsSelectors";
import { getUserActiveWorkspace } from "@/entities/User";
import { InspectionDetailsForm } from "@/features/Inspections/editInspection/ui/InspectionDetailsForm/InspectionDetailsForm";
import { createInspection } from "@/features/Inspections/inspectionsInfiniteList/model/services/createInspection/createInspection";
import { updateInspection } from "@/features/Inspections/inspectionsInfiniteList/model/services/updateInspection/updateInspection";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

export interface EditInspectionProps {
    className?: string;
    onUpdated: () => void;
    onCanceled: () => void;
}

export const EditInspection = memo((props: EditInspectionProps) => {
    const { className, onUpdated, onCanceled } = props;

    const [form] = useForm();
    const dispatch = useAppDispatch();
    const detailsForm = useSelector(getInspectionDetailsForm);
    const activeWorkspace = useSelector(getUserActiveWorkspace);

    const onSave = useCallback(async () => {
        if (detailsForm) {
            try {
                if (!detailsForm.id) {
                    // Создаем запись
                    const newEmployee = await dispatch(
                        createInspection({
                            data: detailsForm,
                            workspaceId: activeWorkspace?.id,
                        }),
                    ).unwrap();

                    onUpdated();
                } else {
                    // Обновляем запись
                    await dispatch(
                        updateInspection({
                            id: detailsForm.id,
                            data: detailsForm,
                        }),
                    );

                    onUpdated();
                }
            } catch {}
        }
    }, [detailsForm, dispatch, activeWorkspace?.id, onUpdated]);

    return (
        <EditFormWrapper
            title={
                detailsForm?.id ? "Редактирование проверки" : "Новая проверка"
            }
            form={form}
            onSaveClick={onSave}
            onBackClick={onCanceled}
        >
            <InspectionDetailsForm form={form} />
        </EditFormWrapper>
    );
});
