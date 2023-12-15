import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./PageError.module.scss";

export interface PageErrorProps {
    className?: string;
}

const PageError = (props: PageErrorProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            {"Что-то пошло не так"}
        </div>
    );
};

export default PageError;
