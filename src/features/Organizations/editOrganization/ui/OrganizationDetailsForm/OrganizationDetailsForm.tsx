import {
    getOrganizationDetailsError,
    getOrganizationDetailsForm,
    getOrganizationDetailsIsLoading,
} from "@/entities/Organization";
import { organizationDetailsActions } from "@/entities/Organization/model/slice/organizationDetailsSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, Col, Form, FormInstance, Image, Input, Row } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./OrganizationDetailsForm.module.scss";

interface OrganizationDetailsFormProps {
    className?: string;
    form: FormInstance;
}

export const OrganizationDetailsForm = memo(
    (props: OrganizationDetailsFormProps) => {
        const { className, form } = props;

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

        return (
            <>
                {error && <Alert type={"error"} message={error} />}
                <Form
                    id={"organizationDetailsForm"}
                    form={form}
                    rootClassName={classNames(cls.OrganizationDetailsForm, {}, [
                        className,
                    ])}
                    layout={"vertical"}
                    disabled={isLoading}
                    fields={fields}
                    onValuesChange={onValueChanged}
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
                </Form>
            </>
        );
    },
);
