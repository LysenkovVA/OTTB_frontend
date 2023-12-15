import { SignUp } from "@/features/signUp";
import { Flex } from "antd";
import { memo } from "react";

export interface SignUpPageProps {
    className?: string;
}

const SignUpPage = (props: SignUpPageProps) => {
    return (
        <Flex justify={"center"} align={"center"}>
            <SignUp />
        </Flex>
    );
};

export default memo(SignUpPage);
