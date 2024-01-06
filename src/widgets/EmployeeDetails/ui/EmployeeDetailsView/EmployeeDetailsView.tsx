import { CertificateItem } from "@/entities/Certificate/ui/CertificateItem/CertificateItem";
import { Employee } from "@/entities/Employee";
import emailFieldSvg from "@/shared/assets/svg/emailField.svg";
import phoneFieldSvg from "@/shared/assets/svg/phoneField.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Col, Divider, Flex, Row, Typography } from "antd";
import { memo } from "react";
import cls from "./EmployeeDetailsView.module.scss";

interface EmployeeDetailsViewProps {
    className?: string;
    employee: Employee;
}

export const EmployeeDetailsView = memo((props: EmployeeDetailsViewProps) => {
    const { className, employee } = props;

    const employeeDetailsContent = (
        <>
            <Flex gap={"large"}>
                <EditableAvatar
                    className={cls.avatar}
                    shape={"square"}
                    file={employee?.avatar}
                    canEdit={false}
                />
                <Flex
                    align={"start"}
                    flex={"content"}
                    justify={"space-between"}
                >
                    <Flex vertical>
                        <Typography.Text className={cls.surname}>
                            {employee?.surname}
                        </Typography.Text>
                        <Typography.Text className={cls.name}>
                            {employee?.name}
                        </Typography.Text>
                        <Typography.Text type={"secondary"}>
                            {employee?.berth?.value}
                        </Typography.Text>
                    </Flex>
                    <Flex vertical justify={"flex-end"} align={"flex-end"}>
                        <Typography.Text type={"warning"} className={cls.name}>
                            {employee?.workspace?.name}
                        </Typography.Text>
                        <Typography.Text
                            type={"secondary"}
                            className={cls.name}
                        >
                            {employee?.department?.name}
                        </Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
            <PreviewField component={phoneFieldSvg} value={employee?.phone} />
            <PreviewField component={emailFieldSvg} value={employee?.email} />
        </>
    );

    const certificatesContent = (
        <Row gutter={[8, 8]}>
            {employee?.certificates &&
                employee?.certificates?.length > 0 &&
                employee?.certificates?.map((certificate) => (
                    <Col key={certificate.id} span={24 / 3}>
                        <CertificateItem certificate={certificate} />
                    </Col>
                ))}
        </Row>
    );

    return (
        <div className={classNames(cls.EmployeeDetailsView, {}, [className])}>
            <Flex vertical>
                {employeeDetailsContent}
                <Divider orientation={"left"} orientationMargin={0}>
                    Удостоверения
                </Divider>
                {certificatesContent}
            </Flex>
        </div>
    );
});
