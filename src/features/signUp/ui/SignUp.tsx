import { getRegisteredUserId } from "@/entities/User";
import { userActions } from "@/entities/User/model/slice/userSlice";
import logo from "@/shared/assets/logo/crane.png";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Alert, Button, Flex, Image, Input } from "antd";
import { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getSignUpEmail,
    getSignUpError,
    getSignUpIsLoading,
    getSignUpPassword,
    getSignUpRepeatedPassword,
} from "../model/selectors/signUpSelectors";
import { signUpByEmail } from "../model/services/signUpByEmail/signUpByEmail";
import { signUpActions, signUpReducer } from "../model/slice/signUpSlice";

const initialReducers: ReducersList = { signUpSchema: signUpReducer };

export const SignUp = memo(() => {
    const dispatch = useAppDispatch();

    const email = useSelector(getSignUpEmail);
    const password = useSelector(getSignUpPassword);
    const repeatedPassword = useSelector(getSignUpRepeatedPassword);
    const isLoading = useSelector(getSignUpIsLoading);
    const error = useSelector(getSignUpError);

    const registeredUserId = useSelector(getRegisteredUserId);

    const navigate = useNavigate();

    useEffect(() => {
        if (registeredUserId) {
            dispatch(signUpActions.setEmail(""));
            dispatch(signUpActions.setPassword(""));
            dispatch(signUpActions.setRepeatedPassword(""));
            dispatch(signUpActions.setError(""));
        }
    }, [registeredUserId, navigate, dispatch]);

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(signUpActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(signUpActions.setPassword(value));
        },
        [dispatch],
    );

    const onChangeRepeatedPassword = useCallback(
        (value: string) => {
            dispatch(signUpActions.setRepeatedPassword(value));
        },
        [dispatch],
    );

    const onSignUp = useCallback(async () => {
        if (password !== repeatedPassword) {
            dispatch(signUpActions.setError("Пароли не совпадают!"));
        } else {
            await dispatch(signUpByEmail({ email, password }));
        }
    }, [dispatch, email, password, repeatedPassword]);

    const onGoToLogin = useCallback(() => {
        dispatch(userActions.setRegisteredData(""));
        navigate("/");
    }, [dispatch, navigate]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Flex
                align={"center"}
                gap={"small"}
                vertical
                style={{ width: "40%", marginTop: "5%" }}
            >
                <Image src={logo} width={100} height={100} preview={false} />
                <Input
                    title={"E-mail"}
                    placeholder={"E-mail"}
                    value={email}
                    onChange={(e) => onChangeEmail(e.target.value)}
                    style={{ width: "100%" }}
                />
                <Input.Password
                    title={"Password"}
                    type={"password"}
                    placeholder={"Пароль"}
                    value={password}
                    onChange={(e) => onChangePassword(e.target.value)}
                />
                <Input.Password
                    title={"Password"}
                    type={"password"}
                    placeholder={"Повторите пароль"}
                    value={repeatedPassword}
                    onChange={(e) => onChangeRepeatedPassword(e.target.value)}
                />
                {error && <Alert message={error} type="error" />}
                {registeredUserId && (
                    <Alert
                        message={"Пользователь зарегистрирован!"}
                        type="success"
                    />
                )}
                <Button
                    type={"primary"}
                    onClick={onSignUp}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>
                <Button type={"link"} onClick={onGoToLogin}>
                    {"Войти"}
                </Button>
            </Flex>
        </DynamicModuleLoader>
    );
});
