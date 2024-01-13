import { MenuProps } from "antd";
import { Key, ReactNode } from "react";

export type MenuItem = Required<MenuProps>["items"][number];

export interface AppMenuItemType {
    label: ReactNode;
    key?: Key | null;
    icon?: ReactNode;
    children?: MenuItem[];
}
