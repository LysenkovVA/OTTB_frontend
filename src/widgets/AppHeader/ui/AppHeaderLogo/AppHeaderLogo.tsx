import { getUser } from "@/entities/User";
import logo from "@/shared/assets/logo/crane.png";
import { Flex, Image, Typography } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";
import cls from "./AppHeaderLogo.module.scss";

interface AppHeaderLogoProps {
    className?: string;
}

export const AppHeaderLogo = memo((props: AppHeaderLogoProps) => {
    const { className } = props;

    const user = useSelector(getUser);

    return (
        <div className={cls.AppHeaderLogo}>
            <Flex
                // rootClassName={cls.AppHeaderLogo}
                align={"center"}
                justify={"center"}
            >
                <Image
                    width={50}
                    height={50}
                    src={logo}
                    alt={"logo"}
                    preview={false}
                />
                <Flex vertical justify={"center"} align={"center"}>
                    <Typography.Text className={cls.text}>
                        Охрана труда
                    </Typography.Text>
                    {user?.subscriptions !== undefined &&
                        user?.subscriptions?.length > 0 && (
                            <Typography.Text className={cls.subscription}>
                                {user.subscriptions[0].value}
                            </Typography.Text>
                        )}
                </Flex>
            </Flex>
        </div>
    );
});
