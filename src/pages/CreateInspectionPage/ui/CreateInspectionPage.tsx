import { classNames } from "@/shared/lib/classNames/classNames";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { memo } from "react";
import cls from "./CreateInspectionPage.module.scss";

interface CreateInspectionPageProps {
    className?: string;
}

const CreateInspectionPage = (props: CreateInspectionPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.CreateInspectionPage, {}, [className])}>
            <ErrorInfo
                status={"info"}
                title={"Создание новой проверки"}
                subtitle={"Эта страница находится в разработке..."}
            />
        </div>
    );
};

export default memo(CreateInspectionPage);
