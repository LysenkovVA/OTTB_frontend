import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { Button, Result } from "antd";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

export interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = (props: NotFoundPageProps) => {
    const { className } = props;
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Страница не найдена!"
            extra={
                <Button
                    type="primary"
                    onClick={() => navigate(RoutePath.login)}
                >
                    На главную
                </Button>
            }
        />
    );
};

export default memo(NotFoundPage);
