import { classNames } from "@/shared/lib/classNames/classNames";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
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
            <EditFormWrapper
                title={"Новый объект"}
                // form={form}
                // onSave={onSave}
                // onCancel={() => {}}
            >
                <ErrorInfo
                    status={"info"}
                    title={"Создание нового объекта"}
                    subtitle={"Эта страница находится в разработке..."}
                />
            </EditFormWrapper>
        </div>
    );
};

export default memo(CreateConstructionObjectPage);
