import { classNames } from "@/shared/lib/classNames/classNames";
import { EditFormWrapper } from "@/shared/ui/EditFormWrapper";
import { ErrorInfo } from "@/shared/ui/ErrorInfo/ErrorInfo";
import { memo } from "react";
import cls from "./CreateCertificatePage.module.scss";

export interface CreateCertificatePageProps {
    className?: string;
}

const CreateCertificatePage = (props: CreateCertificatePageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.CreateCertificatePage, {}, [className])}>
            <EditFormWrapper
                title={"Новое удостоверение"}
                // form={form}
                // onSave={onSave}
                // onCancel={() => {}}
            >
                <ErrorInfo
                    status={"info"}
                    title={"Создание нового удостоверения"}
                    subtitle={"Эта страница находится в разработке..."}
                />
            </EditFormWrapper>
        </div>
    );
};

export default memo(CreateCertificatePage);
