import { removeProfileAvatar } from "@/features/Profiles/profileCard/model/services/removeProfileAvatar/removeProfileAvatar";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { SaveCancelButtons } from "@/shared/ui/SaveCancelButtons/SaveCancelButtons";
import { Card } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getProfileData,
    getProfileDataFormDataRemoveAvatarOnUpdate,
    getProfileDataInitialized,
    getProfileDataIsLoading,
    getProfileFormData,
    getProfileFormDataAvatar,
} from "../../model/selectors/profileSelectors";
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData";
import { updateProfileAvatar } from "../../model/services/updateProfileAvatar/updateProfileAvatar";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions, profileReducer } from "../../model/slice/profileSlice";
import { ProfileCardForm } from "../ProfileCardForm/ProfileCardForm";
import { ProfileCardView } from "../ProfileCardView/ProfileCardView";

interface ProfileCardProps {
    className?: string;
}

const reducers: ReducersList = {
    profileSchema: profileReducer,
};

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { id: profileId } = useParams<{ id: string }>();
    const [readOnly, setReadOnly] = useState(true);

    const dispatch = useAppDispatch();

    const isInitialized = useSelector(getProfileDataInitialized);
    const isLoadingData = useSelector(getProfileDataIsLoading);
    const profileData = useSelector(getProfileData);
    const profileFormData = useSelector(getProfileFormData);
    const formAvatar = useSelector(getProfileFormDataAvatar);
    const needAvatarDelete = useSelector(
        getProfileDataFormDataRemoveAvatarOnUpdate,
    );

    useEffect(() => {
        if (!isInitialized && !isLoadingData) {
            dispatch(fetchProfileData({ profileId }));
        }
    }, [dispatch, isInitialized, isLoadingData, profileData, profileId]);

    const onEditClick = useCallback(() => {
        setReadOnly(false);
    }, [setReadOnly]);

    const onSaveClick = useCallback(async () => {
        // Обновляем данные
        await dispatch(
            updateProfileData({
                profileData: profileFormData,
            }),
        );

        // Обновляем аватар
        if (!needAvatarDelete && formAvatar && profileFormData.id) {
            const blob = await fetch(formAvatar).then((r) => r.blob());
            await dispatch(
                updateProfileAvatar({ profileId: profileData.id!, file: blob }),
            );
        }

        // Удаляем аватар
        if (needAvatarDelete) {
            await dispatch(
                removeProfileAvatar({ fileId: profileData.avatar?.id }),
            );
        }

        // Получаем новые данные (лишний запрос!)
        await dispatch(fetchProfileData({ profileId }));

        setReadOnly(true);
    }, [
        dispatch,
        profileFormData,
        needAvatarDelete,
        formAvatar,
        profileId,
        profileData.id,
        profileData.avatar?.id,
    ]);

    const onCancelClick = useCallback(() => {
        dispatch(profileActions.setProfileFormData({ ...profileData }));
        dispatch(profileActions.setProfileFormDataAvatar(""));
        dispatch(profileActions.setRemoveAvatarOnUpdate(false));
        setReadOnly(true);
    }, [dispatch, profileData]);

    const extraContent = (
        <>
            {readOnly ? (
                <a onClick={onEditClick}>Изменить</a>
            ) : (
                <SaveCancelButtons
                    onSaveClick={onSaveClick}
                    onCancelClick={onCancelClick}
                />
            )}
        </>
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <Card title={"Профиль пользователя"} extra={extraContent}>
                {readOnly ? <ProfileCardView /> : <ProfileCardForm />}
            </Card>
        </DynamicModuleLoader>
    );
});
