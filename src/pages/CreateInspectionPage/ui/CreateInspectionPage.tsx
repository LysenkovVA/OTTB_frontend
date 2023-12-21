import { classNames } from "@/shared/lib/classNames/classNames";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
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
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <EditFormWrapper
                title={"Новая проверка"}
                // form={form}
                // onSave={onSave}
                // onCancel={() => {}}
            >
                <ErrorInfo
                    status={"info"}
                    title={"Создание новой проверки"}
                    subtitle={"Эта страница находится в разработке..."}
                />
            </EditFormWrapper>
        </div>
    );
};

export default memo(CreateInspectionPage);
