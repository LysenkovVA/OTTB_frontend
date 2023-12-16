import { getAuthenticatedUser } from "@/entities/User";
import { getAuthenticatedUserIsLoading } from "@/entities/User/model/selectors/getAuthenticatedUser/getAuthenticatedUser";
import { getUserIsInited } from "@/entities/User/model/selectors/getUserIsInited/getAuthenticatedUserId";
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
    const authenticatedUser = useSelector(getAuthenticatedUser);
    const isLoading = useSelector(getAuthenticatedUserIsLoading);
    const userIsInited = useSelector(getUserIsInited);
    const navigate = useNavigate();

    // Загружаем информацию об авторизованном пользователе
    useEffect(() => {
        if (!userIsInited && !isLoading) {
            dispatch(initAuthData());
        }
    }, [dispatch, isLoading, navigate, userIsInited]);

    if (isLoading) {
        return null;
    }

    if (authenticatedUser?.id) {
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
                        {userIsInited && !isLoading && <AppRouter />}
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
                {userIsInited && !isLoading && <AppRouter />}
            </div>
        );
    }
};
