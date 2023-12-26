import {
    berthDetailsActions,
    getBerthDetailsForm,
    getBerthDetailsIsLoading,
} from "@/entities/Berth";
import { getBerthTypeDetailsError } from "@/entities/BerthType";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, Col, Form, FormInstance, Input, Row } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./BerthForm.module.scss";

export interface BerthFormProps {
    className?: string;
    form: FormInstance;
}

export const BerthForm = memo((props: BerthFormProps) => {
    const { className, form } = props;

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getBerthDetailsIsLoading);
    const error = useSelector(getBerthTypeDetailsError);
    const detailsForm = useSelector(getBerthDetailsForm);

    const fields = useMemo((): FieldData[] => {
        if (!detailsForm) {
            return [];
        }

        return [{ name: ["value"], value: detailsForm?.value }];
    }, [detailsForm]);

    const onValueChanged = useCallback(
        async (changedValues: any) => {
            if (!detailsForm) {
                return;
            }

            Object.keys(changedValues).forEach((key) => {
                dispatch(
                    berthDetailsActions.setFormData({
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
                id={"berthDetailsForm"}
                form={form}
                preserve={false} // Чтобы поля в модалке сбрасывались
                rootClassName={classNames(cls.BerthForm, {}, [className])}
                layout={"vertical"}
                disabled={isLoading}
                fields={fields}
                onValuesChange={onValueChanged}
            >
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item
                            required
                            name={"value"}
                            label={"Должность"}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Пожалуйста, укажите название должности!",
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
});
