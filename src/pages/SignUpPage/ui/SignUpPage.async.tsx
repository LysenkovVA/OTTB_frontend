import { FC, lazy } from "react";
import { SignUpPageProps } from "./SignUpPage";

export const SignUpPageAsync = lazy<FC<SignUpPageProps>>(() => {
    return import("./SignUpPage");
});
