import {
    getUser,
    getUserIsInitialized,
    getUserIsLoading,
} from "@/entities/User";
import { initAuthData } from "@/entities/User/model/services/initAuthData/initAuthData";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AppHeader } from "@/widgets/AppHeader";
import { AppSideMenu } from "@/widgets/AppSideMenu";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cls from "./App.modules.scss";
import { AppRouter } from "./providers/router";
import "./styles/index.scss";

export const App = () => {
    const dispatch = useAppDispatch();
    const authUser = useSelector(getUser);
    const isLoading = useSelector(getUserIsLoading);
    const userIsInitialized = useSelector(getUserIsInitialized);
    const navigate = useNavigate();

    // Загружаем информацию об авторизованном пользователе
    useEffect(() => {
        if (!userIsInitialized && !isLoading) {
            dispatch(initAuthData());
        }
    }, [dispatch, isLoading, navigate, userIsInitialized]);

    if (isLoading) {
        return null;
    }

    if (authUser?.id) {
        return (
            <Layout className={cls.layout}>
                <Header className={cls.header}>
                    <AppHeader />
                </Header>
                <Layout>
                    <Sider className={cls.sider} theme={"light"}>
                        <AppSideMenu />
                        {/*Странный рендеринг*/}
                        {/*<AppMenu />*/}
                    </Sider>
                    <Content className={cls.content}>
                        {userIsInitialized && !isLoading && <AppRouter />}
                    </Content>
                </Layout>
            </Layout>
        );
    } else {
        return (
            <div className="content-page">
                {userIsInitialized && !isLoading && <AppRouter />}
            </div>
        );
    }
};
