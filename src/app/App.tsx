import {
    getUser,
    getUserIsInitialized,
    getUserIsLoading,
} from "@/entities/User";
import { initAuthData } from "@/entities/User/model/services/initAuthData/initAuthData";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AppFooter } from "@/widgets/AppFooter";
import { AppHeader } from "@/widgets/AppHeader";
import { AppSideMenu } from "@/widgets/AppSideMenu";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
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
            <Layout>
                <Header
                    style={{ backgroundColor: "white" }}
                    className={classNames(cls.header, {}, [])}
                >
                    <AppHeader />
                </Header>
                <Layout hasSider>
                    <Sider className={cls.sider} theme={"light"}>
                        <AppSideMenu />
                    </Sider>
                    <Content className={classNames(cls.content)}>
                        {userIsInitialized && !isLoading && <AppRouter />}
                    </Content>
                </Layout>
                <Layout>
                    <Footer className={classNames(cls.footer)}>
                        <AppFooter />
                    </Footer>
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
