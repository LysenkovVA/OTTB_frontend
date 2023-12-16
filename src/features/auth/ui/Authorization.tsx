import { getUser } from "@/entities/User";
import logo from "@/shared/assets/logo/crane.png";
import { AppRoutes, RoutePath } from "@/shared/config/routeConfig/routeConfig";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Image, Input } from "antd";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getAuthEmail,
    getAuthError,
    getAuthIsLoading,
    getAuthPassword,
} from "../model/selectors/authSchemaSelectors";
import { authByEmail } from "../model/services/authByEmail/authByEmail";
import { authActions, authReducer } from "../model/slice/authSlice";

// Редюсеры для компонента
const initialReducers: ReducersList = { authSchema: authReducer };

export const Authorization = memo(() => {
    const dispatch = useAppDispatch();

    const email = useSelector(getAuthEmail);
    const password = useSelector(getAuthPassword);
    const isLoading = useSelector(getAuthIsLoading);
    const error = useSelector(getAuthError);
    const user = useSelector(getUser);

    const navigate = useNavigate();

    // Отработает только один раз
    useInitialEffect(() => {
        if (user?.id) {
            navigate(RoutePath.inspections);
        }
    });

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(authActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(authActions.setPassword(value));
        },
        [dispatch],
    );
    const onLogin = useCallback(async () => {
        await dispatch(authByEmail({ email, password }));
    }, [dispatch, email, password]);

    const onGoToSignUp = useCallback(() => {
        navigate(AppRoutes.SIGNUP);
    }, [navigate]);

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
                    prefix={<UserOutlined />}
                    placeholder={"E-mail"}
                    value={email}
                    onChange={(e) => onChangeEmail(e.target.value)}
                    style={{ width: "100%" }}
                />
                <Input.Password
                    prefix={<LockOutlined />}
                    type={"password"}
                    placeholder={"Пароль"}
                    value={password}
                    onChange={(e) => onChangePassword(e.target.value)}
                />
                {error && <Alert message={error} type="error" />}
                <Button
                    type={"primary"}
                    onClick={onLogin}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    {isLoading ? "Вход..." : "Войти"}
                </Button>
                <Button type={"link"} onClick={onGoToSignUp}>
                    {"Зарегистрироваться"}
                </Button>
            </Flex>
        </DynamicModuleLoader>
    );
});
