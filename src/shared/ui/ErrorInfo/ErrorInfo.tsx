import { Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import { memo, ReactNode } from "react";

interface ErrorInfoProps {
    className?: string;
    status: ResultStatusType;
    title: ReactNode;
    subtitle: ReactNode;
}

export const ErrorInfo = memo((props: ErrorInfoProps) => {
    const { className, status, title, subtitle } = props;
    return <Result status={status} title={title} subTitle={subtitle} />;
});
