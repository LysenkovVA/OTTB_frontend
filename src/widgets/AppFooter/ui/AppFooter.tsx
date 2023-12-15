import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import cls from "./AppFooter.module.scss";

export interface HeaderProps {
    className?: string;
}

export const AppFooter = memo((props: HeaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.AppFooter, {}, [className])}>
            {"Лысенков Виктор © " + new Date().getFullYear()}
        </div>
    );
});
