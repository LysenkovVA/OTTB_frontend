import { getAuthenticatedUser } from "@/entities/User";
import { authLogout } from "@/features/logout/model/services/logout/authLogout";
import { logoutReducer } from "@/features/logout/model/slice/logoutSlice";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import { Flex, Popover, Space, Typography } from "antd";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./HeaderAvatar.module.scss";

export interface HeaderAvatarProps {
    className?: string;
}

const reducers: ReducersList = {
    logoutSchema: logoutReducer,
    // profileSchema: profileReducer,
};

export const HeaderAvatar = memo((props: HeaderAvatarProps) => {
    const { className } = props;

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector(getAuthenticatedUser);

    const showMenu = useCallback(
        (open: boolean) => {
            setIsOpen(open);
        },
        [setIsOpen],
    );

    const onProfileClick = useCallback(() => {
        navigate(RoutePath.profile + user.profile?.id);
    }, [navigate, user.profile?.id]);

    const onLogout = useCallback(() => {
        dispatch(authLogout());
    }, [dispatch]);

    const content = (
        <div>
            <Space direction={"vertical"}>
                <a onClick={() => onProfileClick()}>Профиль</a>
                <a onClick={() => onLogout()}>Выход</a>
            </Space>
        </div>
    );

    return (
        // TODO Редюсер демонтируется до fulfilled
        <DynamicModuleLoader reducers={reducers}>
            <Popover
                content={content}
                open={isOpen}
                onOpenChange={showMenu}
                placement={"bottomLeft"}
            >
                <div className={classNames(cls.HeaderAvatar, {}, [className])}>
                    <Flex vertical justify={"center"} align={"center"}>
                        <EditableAvatar
                            file={user.profile?.avatar}
                            canEdit={false}
                        />
                        <Typography.Text keyboard type={"secondary"}>
                            {user.profile?.name ?? user.email}
                        </Typography.Text>
                    </Flex>
                </div>
            </Popover>
        </DynamicModuleLoader>
    );
});
