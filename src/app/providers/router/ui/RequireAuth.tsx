import { getAuthenticatedUser } from "@/entities/User";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
    children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
    const auth = useSelector(getAuthenticatedUser);
    const location = useLocation();
    console.log("RequiredAuth Location: " + JSON.stringify(location));

    if (!auth.id) {
        return (
            <Navigate to={RoutePath.login} state={{ from: location }} replace />
        );
    }

    return children;
}
