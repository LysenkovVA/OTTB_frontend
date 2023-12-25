import { ProfileDetails } from "@/widgets/ProfileDetails";
import { memo } from "react";

export interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    return <ProfileDetails />;
};

export default memo(ProfilePage);
