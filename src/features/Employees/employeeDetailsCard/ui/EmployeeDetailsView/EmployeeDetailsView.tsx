import { CertificateItem } from "@/entities/Certificate/ui/CertificateItem/CertificateItem";
import emailFieldSvg from "@/shared/assets/svg/emailField.svg";
import phoneFieldSvg from "@/shared/assets/svg/phoneField.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import { PreviewField } from "@/shared/ui/PreviewField";
import { Col, Divider, Flex, Row, Typography } from "antd";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getEmployeeDetails } from "../../model/selectors/getEmployeeDetails/getEmployeeDetails";
import cls from "./EmployeeDetailsView.module.scss";

interface EmployeeDetailsViewProps {
    className?: string;
}

export const EmployeeDetailsView = memo((props: EmployeeDetailsViewProps) => {
    const { className } = props;

    const employeeDetails = useSelector(getEmployeeDetails);

    const employeeDetailsContent = (
        <>
            <Flex gap={"large"}>
                <EditableAvatar
                    className={cls.avatar}
                    shape={"square"}
                    file={employeeDetails?.avatar}
                    canEdit={false}
                />
                <Flex
                    align={"start"}
                    flex={"content"}
                    justify={"space-between"}
                >
                    <Flex vertical>
                        <Typography.Text className={cls.surname}>
                            {employeeDetails?.surname}
                        </Typography.Text>
                        <Typography.Text className={cls.name}>
                            {employeeDetails?.name}
                        </Typography.Text>
                        <Typography.Text type={"secondary"}>
                            {employeeDetails?.berth?.value}
                        </Typography.Text>
                    </Flex>
                    <Flex vertical justify={"flex-end"} align={"flex-end"}>
                        <Typography.Text type={"warning"} className={cls.name}>
                            {employeeDetails?.department?.organization?.name}
                        </Typography.Text>
                        <Typography.Text
                            type={"secondary"}
                            className={cls.name}
                        >
                            {employeeDetails?.department?.name}
                        </Typography.Text>
                    </Flex>
                </Flex>
            </Flex>
            <PreviewField
                component={phoneFieldSvg}
                value={employeeDetails?.phone}
            />
            <PreviewField
                component={emailFieldSvg}
                value={employeeDetails?.email}
            />
        </>
    );

    const certificatesContent = (
        <Row gutter={[8, 8]}>
            {employeeDetails?.certificates &&
                employeeDetails?.certificates?.length > 0 &&
                employeeDetails?.certificates?.map((certificate) => (
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
