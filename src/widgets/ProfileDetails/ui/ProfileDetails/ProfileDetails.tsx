import {
    fetchProfileData,
    getProfileData,
    getProfileDataError,
    getProfileDataInitialized,
    getProfileDataIsLoading,
    profileActions,
    profileReducer,
} from "@/entities/Profile";
import { EditProfile } from "@/features/Profiles/editProfile";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { ViewWrapper } from "@/shared/ui/ViewWrapper";
import { ProfileDetailsView } from "@/widgets/ProfileDetails/ui/ProfileDetailsView/ProfileDetailsView";
import { Skeleton } from "antd";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export interface ProfileDetailsProps {
    className?: string;
}

const reducers: ReducersList = {
    profileSchema: profileReducer,
};

export const ProfileDetails = memo((props: ProfileDetailsProps) => {
    const { id: profileId } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getProfileDataIsLoading);
    const error = useSelector(getProfileDataError);
    const isInitialized = useSelector(getProfileDataInitialized);
    const profileDetails = useSelector(getProfileData);

    useInitialEffect(() => {
        if (!isInitialized && !isLoading && profileId) {
            dispatch(fetchProfileData({ id: profileId }));
        }
    });

    const onCancel = useCallback(() => {
        if (profileDetails) {
            dispatch(profileActions.setFormData(profileDetails));
        }

        setIsEditMode(false);
    }, [dispatch, profileDetails]);

    const skeletonContent = <Skeleton active />;

    const errorContent = (
        <ErrorInfo status={"error"} title={error} subtitle={""} />
    );

    const viewContent = profileDetails ? (
        <ViewWrapper
            title={"Профиль пользователя"}
            onEditClick={() => {
                setIsEditMode(true);
            }}
        >
            <ProfileDetailsView profile={profileDetails} />
        </ViewWrapper>
    ) : null;

    const editContent = (
        <EditProfile
            onUpdated={() => {
                setIsEditMode(false);
                navigate(-1);
            }}
            onCanceled={onCancel}
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            {isLoading
                ? skeletonContent
                : error
                ? errorContent
                : isEditMode
                ? editContent
                : viewContent}
        </DynamicModuleLoader>
    );
});
