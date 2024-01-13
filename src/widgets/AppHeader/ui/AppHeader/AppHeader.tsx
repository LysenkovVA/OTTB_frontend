import { getUserActiveWorkspace } from "@/entities/User";
import { userActions } from "@/entities/User/model/slice/userSlice";
import { Workspace } from "@/entities/Workspace";
import { CreateCheckList } from "@/features/CheckLists/createCheckList";
import { WorkspaceView } from "@/features/Workspaces/WorkspaceView";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AppHeaderLogo } from "@/widgets/AppHeader/ui/AppHeaderLogo/AppHeaderLogo";
import { Flex } from "antd";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { HeaderAvatar } from "../HeaderAvatar/HeaderAvatar";
import cls from "./AppHeader.module.scss";

export interface AppHeaderProps {
    className?: string;
}

export const AppHeader = memo((props: AppHeaderProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const activeWorkspace = useSelector(getUserActiveWorkspace);

    const onWorkspaceChanged = useCallback(
        (value: Workspace | undefined) => {
            dispatch(userActions.setActiveWorkspace(value));
        },
        [dispatch],
    );

    return (
        <Flex
            align={"center"}
            justify={"start"}
            rootClassName={classNames(cls.AppHeader, {}, [className])}
        >
            <AppHeaderLogo />
            <Flex
                align={"center"}
                justify={"space-between"}
                gap={8}
                style={{ marginLeft: "26px", width: "100%" }}
            >
                <WorkspaceView className={cls.workspace} />
                <Flex align={"center"} gap={8}>
                    <CreateCheckList />
                    <HeaderAvatar />
                </Flex>
            </Flex>
        </Flex>
    );
});
