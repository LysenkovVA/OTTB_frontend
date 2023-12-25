import { Profile } from "@/entities/Profile";
import calendarSvg from "@/shared/assets/svg/dateField.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Typography } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import cls from "./ProfileDetailsView.module.scss";

interface ProfileDetailsViewProps {
    className?: string;
    profile: Profile;
}

export const ProfileDetailsView = memo((props: ProfileDetailsViewProps) => {
    const { className, profile } = props;

    return (
        <>
            <div className={cls.avatar}>
                <EditableAvatar
                    file={profile?.avatar}
                    canEdit={false}
                    size={100}
                />
            </div>
            <Typography.Text
                className={classNames(cls.surname)}
                type={!profile?.surname ? "secondary" : undefined}
            >
                {profile?.surname || "Фамилия"}
            </Typography.Text>
            <Typography.Text
                className={cls.name}
                type={!profile?.name ? "secondary" : undefined}
            >
                {profile?.name || "Имя и отчество"}
            </Typography.Text>
            <PreviewField
                component={calendarSvg}
                value={dayjs(profile?.birthDate).format("DD.MM.YYYY")}
            />
        </>
    );
});
