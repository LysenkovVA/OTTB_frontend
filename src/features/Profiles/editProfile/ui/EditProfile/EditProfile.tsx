import {
    getProfileDataAvatarChanged,
    getProfileDataChanged,
    getProfileFormData,
    getProfileFormDataAvatar,
    updateProfileData,
} from "@/entities/Profile";
import { deleteProfileAvatar } from "@/entities/Profile/model/services/deleteProfileAvatar/deleteProfileAvatar";
import { updateProfileAvatar } from "@/entities/Profile/model/services/updateProfileAvatar/updateProfileAvatar";
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
    const dataChanged = useSelector(getProfileDataChanged);
    const avatarChanged = useSelector(getProfileDataAvatarChanged);

    const onSave = useCallback(async () => {
        if (detailsForm?.id) {
            try {
                if (dataChanged) {
                    // Обновляем запись
                    await dispatch(
                        updateProfileData({
                            id: detailsForm.id,
                            data: detailsForm,
                        }),
                    );
                }

                if (avatarChanged) {
                    if (formAvatar) {
                        // Обновляем аватар
                        await dispatch(
                            updateProfileAvatar({
                                profileId: detailsForm.id,
                                file: await FilesHelper.getBlobFromString(
                                    formAvatar,
                                ),
                            }),
                        );
                    } else {
                        // Удаляем аватар
                        await dispatch(
                            deleteProfileAvatar({
                                profileId: detailsForm.id,
                            }),
                        );
                    }
                }

                onUpdated();
            } catch {}
        }
    }, [
        detailsForm,
        dataChanged,
        avatarChanged,
        onUpdated,
        dispatch,
        formAvatar,
    ]);

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
