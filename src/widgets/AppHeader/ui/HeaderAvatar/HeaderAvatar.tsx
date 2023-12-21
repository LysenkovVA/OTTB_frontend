import { getUser } from "@/entities/User";
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
import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { memo, useCallback } from "react";
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

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUser);

    const onProfileClick = useCallback(() => {
        navigate(RoutePath.profile + user?.profile?.id);
    }, [navigate, user?.profile?.id]);

    const onLogout = useCallback(() => {
        dispatch(authLogout());
    }, [dispatch]);

    return (
        // TODO Редюсер демонтируется до fulfilled
        <DynamicModuleLoader reducers={reducers}>
            <div
                className={classNames(cls.HeaderAvatar, {}, [className])}
                onClick={() => onProfileClick()}
            >
                <Flex vertical>
                    <Flex gap={8} justify={"center"} align={"center"}>
                        <EditableAvatar
                            file={user?.profile?.avatar}
                            canEdit={false}
                            size={45}
                        />
                        <Typography.Text type={"secondary"}>
                            {user?.profile?.name ?? user?.email}
                        </Typography.Text>
                        <Button
                            type={"dashed"}
                            icon={
                                <PoweroffOutlined
                                    style={{ color: "orangered" }}
                                />
                            }
                            onClick={() => onLogout()}
                        >
                            {"Выход"}
                        </Button>
                    </Flex>
                    {/* <Typography.Text */}
                    {/*     className={cls.subscriptionText} */}
                    {/*     type={"success"} */}
                    {/* > */}
                    {/*     {"Подписка: " + user?.subscriptions?.[0].value} */}
                    {/* </Typography.Text> */}
                </Flex>
            </div>
        </DynamicModuleLoader>
    );
});
