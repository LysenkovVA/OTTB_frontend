import { classNames } from "@/shared/lib/classNames/classNames";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { memo } from "react";
import cls from "./CreateConstructionObjectPage.module.scss";

interface CreateConstructionObjectPageProps {
    className?: string;
}

const CreateConstructionObjectPage = (
    props: CreateConstructionObjectPageProps,
) => {
    const { className } = props;

    return (
        <div
            className={classNames(cls.CreateConstructionObjectPage, {}, [
                className,
            ])}
        >
            <ErrorInfo
                status={"info"}
                title={"Создание нового объекта"}
                subtitle={"Эта страница находится в разработке..."}
            />
        </div>
    );
};

export default memo(CreateConstructionObjectPage);
