import { classNames } from "@/shared/lib/classNames/classNames";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { memo } from "react";
import cls from "./CreateDepartmentPage.module.scss";

interface CreateDepartmentPageProps {
    className?: string;
}

const CreateDepartmentPage = (props: CreateDepartmentPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.CreateDepartmentPage, {}, [className])}>
            <ErrorInfo
                status={"info"}
                title={"Создание нового участка"}
                subtitle={"Эта страница находится в разработке..."}
            />
        </div>
    );
};

export default memo(CreateDepartmentPage);
