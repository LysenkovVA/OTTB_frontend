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
        <div className={cls.AppSideMenu}>
            <Space direction={"vertical"}>{itemsList}</Space>
        </div>
    );
});
