import { classNames } from "@/shared/lib/classNames/classNames";
import { AppHeaderLogo } from "@/widgets/AppHeader/ui/AppHeaderLogo/AppHeaderLogo";
import { memo } from "react";
import { HeaderAvatar } from "../HeaderAvatar/HeaderAvatar";
import cls from "./AppHeader.module.scss";

export interface AppHeaderProps {
    className?: string;
}

export const AppHeader = memo((props: AppHeaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.AppHeader, {}, [className])}>
            <AppHeaderLogo className={classNames(cls.logo)} />
            <HeaderAvatar className={classNames(cls.actions)} />
        </div>
    );
});
