import { getCertificateDetailsForm } from "@/entities/Certificate/model/selectors/certificateSelectors";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { createCertificate } from "@/features/Certificates/certificatesInfiniteList/model/services/createCertificate/createCertificate";
import { updateCertificate } from "@/features/Certificates/certificatesInfiniteList/model/services/updateCertificate/updateCertificate";
import { CertificateDetailsForm } from "@/features/Certificates/editCertificate/ui/CertificateDetailsForm/CertificateDetailsForm";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

export interface EditCertificateProps {
    className?: string;
    onUpdated: () => void;
    onCanceled: () => void;
}

export const EditCertificate = memo((props: EditCertificateProps) => {
    const { className, onUpdated, onCanceled } = props;

    const [form] = useForm();
    const dispatch = useAppDispatch();
    const detailsForm = useSelector(getCertificateDetailsForm);
    const workspaceId = useSelector(getUserActiveWorkspaceId);

    const onSave = useCallback(async () => {
        if (detailsForm) {
            try {
                if (!detailsForm.id) {
                    // Создаем запись
                    const newEmployee = await dispatch(
                        createCertificate({
                            data: detailsForm,
                            workspaceId,
                        }),
                    ).unwrap();

                    onUpdated();
                } else {
                    // Обновляем запись
                    await dispatch(
                        updateCertificate({
                            id: detailsForm.id,
                            data: detailsForm,
                        }),
                    );

                    onUpdated();
                }
            } catch {}
        }
    }, [detailsForm, dispatch, workspaceId, onUpdated]);

    return (
        <EditFormWrapper
            title={
                detailsForm?.id
                    ? `${detailsForm?.number}`
                    : "Новое удостоверение"
            }
            form={form}
            onSaveClick={onSave}
            onBackClick={onCanceled}
        >
            <CertificateDetailsForm form={form} />
        </EditFormWrapper>
    );
});
