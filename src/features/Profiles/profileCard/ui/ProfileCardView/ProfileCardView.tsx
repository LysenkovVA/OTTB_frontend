import { getProfileData } from "@/features/Profiles/profileCard/model/selectors/profileSelectors";
import calendarSvg from "@/shared/assets/svg/dateField.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Typography } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import { useSelector } from "react-redux";
import cls from "./ProfileCardView.module.scss";

interface ProfileCardViewProps {
    className?: string;
}

export const ProfileCardView = memo((props: ProfileCardViewProps) => {
    const profileData = useSelector(getProfileData);

    return (
        <>
            <div className={cls.avatar}>
                <EditableAvatar
                    file={profileData?.avatar}
                    canEdit={false}
                    size={100}
                />
            </div>
            <Typography.Text
                className={classNames(cls.surname)}
                type={!profileData?.surname ? "secondary" : undefined}
            >
                {profileData?.surname || "Фамилия"}
            </Typography.Text>
            <Typography.Text
                className={cls.name}
                type={!profileData?.name ? "secondary" : undefined}
            >
                {profileData?.name || "Имя и отчество"}
            </Typography.Text>
            <PreviewField
                component={calendarSvg}
                value={dayjs(profileData?.birthDate).format("DD.MM.YYYY")}
            />
        </>
    );
});
