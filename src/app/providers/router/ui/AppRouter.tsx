import { RequireAuth } from "@/app/providers/router/ui/RequireAuth";
import {
    AppRouteProps,
    routeConfig,
} from "@/shared/config/routeConfig/routeConfig";
import { Suspense, memo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element = (
            <Suspense fallback={"Загрузка..."}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
