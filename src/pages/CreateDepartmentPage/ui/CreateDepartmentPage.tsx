import { classNames } from "@/shared/lib/classNames/classNames";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
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
            <EditFormWrapper
                title={"Новое подразделение"}
                // form={form}
                // onSave={onSave}
                // onCancel={() => {}}
            >
                <ErrorInfo
                    status={"info"}
                    title={"Создание нового подраздления"}
                    subtitle={"Эта страница находится в разработке..."}
                />
            </EditFormWrapper>
        </div>
    );
};

export default memo(CreateDepartmentPage);
