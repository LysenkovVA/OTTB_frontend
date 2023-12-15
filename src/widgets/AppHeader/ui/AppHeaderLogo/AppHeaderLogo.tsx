import logo from "@/shared/assets/logo/crane.png";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Image, Typography } from "antd";
import { memo } from "react";
import cls from "./AppHeaderLogo.module.scss";

interface AppHeaderLogoProps {
    className?: string;
}

export const AppHeaderLogo = memo((props: AppHeaderLogoProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.AppHeaderLogo, {}, [className])}>
            <Image
                width={40}
                height={40}
                src={logo}
                alt={"logo"}
                preview={false}
            />
            <Typography.Text className={classNames(cls.text)}>
                ОТ и ТБ
            </Typography.Text>
        </div>
    );
});
