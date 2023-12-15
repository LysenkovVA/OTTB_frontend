import { Authorization } from "@/features/auth";
import { Flex } from "antd";
import { memo } from "react";

export interface LoginPageProps {
    className?: string;
}

const LoginPage = (props: LoginPageProps) => {
    return (
        <Flex justify={"center"} align={"center"}>
            <Authorization />
        </Flex>
    );
};

export default memo(LoginPage);
