import { getUser } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppSideMenuItemType } from "@/widgets/AppSideMenu/model/types/AppSideMenuItemType";
import { Button } from "antd";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./AppSideMenuItem.module.scss";

interface AppSideMenuItemProps {
    item: AppSideMenuItemType;
}

export const AppSideMenuItem = memo((props: AppSideMenuItemProps) => {
    const { item } = props;

    const user = useSelector(getUser);

    const navigate = useNavigate();

    // Переход на страницу
    const onClick = useCallback(() => {
        navigate(item.path);
    }, [item, navigate]);

    // Не авторизованный пользователь
    if (!user) {
        return null;
    }

    return (
        <div className={classNames(cls.AppSideMenuItem)}>
            <Button
                className={classNames(cls.button)}
                icon={item.icon}
                type={"link"}
                onClick={onClick}
            >
                {item.text}
            </Button>
        </div>
    );
});
