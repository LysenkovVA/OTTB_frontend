import {
    getProfileFormData,
    getProfileFormDataAvatar,
    updateProfileData,
} from "@/entities/Profile";
import { ProfileDetailsForm } from "@/features/Profiles/editProfile/ui/ProfileDetailsForm/ProfileDetailsForm";
import { FilesHelper } from "@/shared/helpers/FilesHelper";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
import { useForm } from "antd/es/form/Form";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

export interface EditProfileProps {
    className?: string;
    onUpdated: () => void;
    onCanceled: () => void;
}

export const EditProfile = memo((props: EditProfileProps) => {
    const { className, onUpdated, onCanceled } = props;

    const [form] = useForm();
    const dispatch = useAppDispatch();
    const detailsForm = useSelector(getProfileFormData);
    const formAvatar = useSelector(getProfileFormDataAvatar);

    const onSave = useCallback(async () => {
        if (detailsForm?.id) {
            try {
                // Обновляем запись
                await dispatch(
                    updateProfileData({
                        id: detailsForm.id,
                        data: detailsForm,
                        file: await FilesHelper.getBlobFromString(formAvatar),
                    }),
                );

                onUpdated();
            } catch {}
        }
    }, [detailsForm, onUpdated, dispatch, formAvatar]);

    return (
        <EditFormWrapper
            title={"Профиль пользователя"}
            form={form}
            onSaveClick={onSave}
            onBackClick={onCanceled}
        >
            <ProfileDetailsForm form={form} />
        </EditFormWrapper>
    );
});
