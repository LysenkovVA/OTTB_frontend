import { classNames } from "@/shared/lib/classNames/classNames";
import { getAppSideMenuItems } from "@/widgets/AppSideMenu/model/selectors/getAppSideMenuItems";
import { Space } from "antd";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { AppSideMenuItem } from "../AppSideMenuItem/AppSideMenuItem";
import cls from "./AppSideMenu.module.scss";

export interface HeaderProps {
    className?: string;
    collapsed?: boolean;
}

export const AppSideMenu = memo((props: HeaderProps) => {
    const { className, collapsed } = props;

    const items = useSelector(getAppSideMenuItems);

    const itemsList = useMemo(
        () =>
            items.map((item) => {
                return <AppSideMenuItem item={item} key={item.path} />;
            }),
        [items],
    );

    return (
        <div
            className={classNames(
                cls.AppSideMenu,
                { [cls.collapsed]: collapsed },
                [className],
            )}
        >
            <Space direction={"vertical"}>{itemsList}</Space>
        </div>
    );
});
