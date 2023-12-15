import { Certificate } from "@/entities/Certificate/model/types/Certificate";
import dateFieldSvg from "@/shared/assets/svg/dateField.svg";
import scanSvg from "@/shared/assets/svg/image.svg";
import numberFieldSvg from "@/shared/assets/svg/numberField.svg";
import protocolSvg from "@/shared/assets/svg/protocol.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Card, Flex, Skeleton, Typography } from "antd";
import dayjs from "dayjs";
import { memo } from "react";
import cls from "./CertificateItem.module.scss";

interface CertificateItemProps {
    className?: string;
    certificate: Certificate;
    isLoading?: boolean;
}

export const CertificateItem = memo((props: CertificateItemProps) => {
    const { className, certificate, isLoading } = props;

    if (isLoading) {
        return <Skeleton active />;
    }

    return (
        <Card
            // hoverable
            // title={certificate.certificateType?.value ?? "Удостоверение"}
            headStyle={{ color: "green" }}
            className={classNames(cls.CertificateItem, {}, [className])}
        >
            <Flex vertical gap={8}>
                <Flex gap={8}>
                    <Typography.Text>
                        {certificate.certificateType?.value ?? "Удостоверение"}
                    </Typography.Text>
                    {certificate.certificateType?.hasGroups && (
                        <Typography.Text keyboard type={"warning"}>
                            {`группа: ${certificate.group}`}
                        </Typography.Text>
                    )}
                </Flex>

                <Flex vertical>
                    <PreviewField
                        component={numberFieldSvg}
                        value={certificate.number}
                    />
                    <PreviewField
                        component={dateFieldSvg}
                        value={dayjs(certificate.startDate).format(
                            "DD.MM.YYYY",
                        )}
                    />
                </Flex>
                <Flex gap={8}>
                    <PreviewField
                        component={scanSvg}
                        value={String(certificate.scans?.length)}
                    />

                    <PreviewField
                        component={protocolSvg}
                        value={String(certificate.protocols?.length)}
                    />
                </Flex>
            </Flex>
        </Card>
    );
});
