import { getMenuItems } from "@/widgets/AppMenu/model/selectors/getMenuItems";
import { Menu } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";

export interface HeaderProps {
    className?: string;
    collapsed?: boolean;
}

export const AppMenu = memo((props: HeaderProps) => {
    const menuItems = useSelector(getMenuItems);

    return (
        <Menu
            style={{ width: 200 }}
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            // mode={mode}
            // theme={theme}
            items={menuItems}
        />
    );
});
