import {
    getOrganizationDetailsError,
    getOrganizationDetailsForm,
    getOrganizationDetailsIsLoading,
} from "@/features/Organizations/organizationDetailsCard/model/selectors/organizationDetailsSelectors";
import { organizationDetailsActions } from "@/features/Organizations/organizationDetailsCard/model/slice/organizationDetailsSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, Button, Col, Form, Image, Input, Row } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./OrganizationDetailsForm.module.scss";

interface OrganizationDetailsFormProps {
    className?: string;
    onSave: () => void;
    onCancel: () => void;
}

export const OrganizationDetailsForm = memo(
    (props: OrganizationDetailsFormProps) => {
        const { className, onSave, onCancel } = props;

        const dispatch = useAppDispatch();
        const isLoading = useSelector(getOrganizationDetailsIsLoading);
        const error = useSelector(getOrganizationDetailsError);
        const organizationDetailsForm = useSelector(getOrganizationDetailsForm);

        const fields = useMemo((): FieldData[] => {
            if (!organizationDetailsForm) {
                return [];
            }

            return [{ name: ["name"], value: organizationDetailsForm?.name }];
        }, [organizationDetailsForm]);

        const onValueChanged = useCallback(
            async (changedValues: any) => {
                if (!organizationDetailsForm) {
                    return;
                }

                const keys: string[] = Object.keys(changedValues);

                keys.forEach((key) => {
                    switch (key) {
                        case "name":
                            dispatch(
                                organizationDetailsActions.setFormData({
                                    ...organizationDetailsForm,
                                    name: changedValues[key],
                                }),
                            );
                            break;
                    }
                });
            },
            [dispatch, organizationDetailsForm],
        );

        const onFinish = useCallback(async () => {
            onSave();
        }, [onSave]);

        return (
            <>
                {error && <Alert type={"error"} message={error} />}
                <Form
                    id={"organizationDetailsForm"}
                    rootClassName={classNames(cls.OrganizationDetailsForm, {}, [
                        className,
                    ])}
                    layout={"vertical"}
                    disabled={isLoading}
                    fields={fields}
                    onValuesChange={onValueChanged}
                    onFinish={onFinish}
                >
                    <Row gutter={[8, 8]} justify={"center"}>
                        <Col span={12} style={{ height: 200 }}>
                            <Form.Item>
                                <Image
                                    rootClassName={cls.logo}
                                    preview={false}
                                    placeholder={true}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item
                                required
                                name={"name"}
                                label={"Название"}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Пожалуйста, укажите название!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]} justify={"center"}>
                        <Col span={12}>
                            <Form.Item>
                                <Button
                                    htmlType={"submit"}
                                    type={"primary"}
                                    style={{ width: "100%" }}
                                >
                                    Сохранить
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <Button
                                    style={{ width: "100%" }}
                                    onClick={onCancel}
                                >
                                    Отмена
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    },
);
