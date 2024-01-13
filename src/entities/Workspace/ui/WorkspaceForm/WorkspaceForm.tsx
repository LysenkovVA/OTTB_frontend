import {
    getWorkspaceDetailsError,
    getWorkspaceDetailsForm,
    getWorkspaceDetailsIsLoading,
    workspaceDetailsActions,
} from "@/entities/Workspace";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { AppImage } from "@/shared/ui/AppImage";
import { GlobalOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import {
    Alert,
    Col,
    Divider,
    Form,
    FormInstance,
    Input,
    Row,
    Typography,
} from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./WorkspaceForm.module.scss";

export interface WorkspaceFormProps {
    className?: string;
    form: FormInstance;
}

export const WorkspaceForm = memo((props: WorkspaceFormProps) => {
    const { className, form } = props;

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getWorkspaceDetailsIsLoading);
    const error = useSelector(getWorkspaceDetailsError);
    const detailsForm = useSelector(getWorkspaceDetailsForm);

    const fields = useMemo((): FieldData[] => {
        if (!detailsForm) {
            return [];
        }

        return [
            { name: ["name"], value: detailsForm?.name },
            {
                name: ["organizationName"],
                value: detailsForm?.organizationName,
            },
            {
                name: ["organizationAddress"],
                value: detailsForm?.organizationAddress,
            },
            {
                name: ["organizationPhone"],
                value: detailsForm?.organizationPhone,
            },
            {
                name: ["organizationEmail"],
                value: detailsForm?.organizationEmail,
            },
            { name: ["organizationWeb"], value: detailsForm?.organizationWeb },
            { name: ["organizationINN"], value: detailsForm?.organizationINN },
            { name: ["organizationKPP"], value: detailsForm?.organizationKPP },
            {
                name: ["organizationBank"],
                value: detailsForm?.organizationBank,
            },
            { name: ["organizationRS"], value: detailsForm?.organizationRS },
            { name: ["organizationKS"], value: detailsForm?.organizationKS },
            { name: ["organizationBIK"], value: detailsForm?.organizationBIK },
            {
                name: ["organizationOKPO"],
                value: detailsForm?.organizationOKPO,
            },
            {
                name: ["organizationOKVED"],
                value: detailsForm?.organizationOKVED,
            },
            {
                name: ["organizationOGRN"],
                value: detailsForm?.organizationOGRN,
            },
        ];
    }, [detailsForm]);

    const onValueChanged = useCallback(
        async (changedValues: any) => {
            if (!detailsForm) {
                return;
            }

            Object.keys(changedValues).forEach((key) => {
                dispatch(
                    workspaceDetailsActions.setFormData({
                        ...detailsForm,
                        [key]: changedValues[key],
                    }),
                );
            });
        },
        [detailsForm, dispatch],
    );

    return (
        <>
            {error && <Alert type={"error"} message={error} />}
            <Form
                id={"workspaceDetailsForm"}
                form={form}
                preserve={false} // Чтобы поля в модалке сбрасывались
                rootClassName={classNames(cls.WorkspaceForm, {}, [className])}
                layout={"vertical"}
                disabled={isLoading}
                fields={fields}
                onValuesChange={onValueChanged}
            >
                <Form.Item
                    required
                    name={"name"}
                    label={"Краткое название"}
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, укажите краткое название!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Row gutter={[8, 8]} align={"top"} justify={"center"}>
                    <Col span={12}>
                        <Form.Item
                            name={"organizationName"}
                            label={"Полное название организации"}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <AppImage height={150} />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider orientation="left" orientationMargin={20}>
                    <Typography.Title level={5}>Контакты</Typography.Title>
                </Divider>
                <Row gutter={[8, 8]} align={"middle"}>
                    <Col span={8}>
                        <Form.Item name={"organizationPhone"}>
                            <Input
                                placeholder={"Укажите телефон"}
                                prefix={
                                    <PhoneOutlined
                                        style={{
                                            color: "blue",
                                        }}
                                    />
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={"organizationEmail"}>
                            <Input
                                placeholder={"Укажите e-mail"}
                                prefix={
                                    <MailOutlined
                                        style={{
                                            color: "blue",
                                        }}
                                    />
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={"organizationWeb"}>
                            <Input
                                placeholder={"Укажите web-сайт"}
                                prefix={
                                    <GlobalOutlined
                                        style={{
                                            color: "blue",
                                        }}
                                    />
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider orientation="left" orientationMargin={20}>
                    <Typography.Title level={5}>
                        Финансовая информация
                    </Typography.Title>
                </Divider>
                <Row gutter={[8, 8]} align={"middle"}>
                    <Col span={4}>
                        <Form.Item name={"organizationINN"}>
                            <Input
                                placeholder={"Укажите ИНН"}
                                prefix={"ИНН:"}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name={"organizationKPP"}>
                            <Input
                                placeholder={"Укажите КПП"}
                                prefix={"КПП:"}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item name={"organizationBank"}>
                            <Input
                                placeholder={"Укажите банк"}
                                prefix={"Банк:"}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]} align={"middle"}>
                    <Col span={8}>
                        <Form.Item name={"organizationRS"}>
                            <Input prefix={"р/с:"} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]} align={"middle"}>
                    <Col span={8}>
                        <Form.Item name={"organizationKS"}>
                            <Input prefix={"к/с:"} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]} align={"middle"}>
                    <Col span={4}>
                        <Form.Item name={"organizationBIK"}>
                            <Input prefix={"БИК:"} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name={"organizationOKPO"}>
                            <Input prefix={"ОКПО:"} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]} align={"middle"}>
                    <Col span={4}>
                        <Form.Item name={"organizationOKVED"}>
                            <Input prefix={"ОКВЭД:"} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name={"organizationOGRN"}>
                            <Input prefix={"ОГРН:"} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
});
