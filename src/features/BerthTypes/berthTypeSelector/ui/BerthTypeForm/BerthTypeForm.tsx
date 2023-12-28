import {
    berthTypeDetailsActions,
    getBerthTypeDetailsError,
    getBerthTypeDetailsForm,
    getBerthTypeDetailsIsLoading,
} from "@/entities/BerthType";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, Form, FormInstance, Input } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./BerthTypeForm.module.scss";

export interface BerthTypeFormProps {
    className?: string;
    form: FormInstance;
}

export const BerthTypeForm = memo((props: BerthTypeFormProps) => {
    const { className, form } = props;

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getBerthTypeDetailsIsLoading);
    const error = useSelector(getBerthTypeDetailsError);
    const detailsForm = useSelector(getBerthTypeDetailsForm);

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
                    berthTypeDetailsActions.setFormData({
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
                id={"berthTypeDetailsForm"}
                form={form}
                preserve={false} // Чтобы поля в модалке сбрасывались
                rootClassName={classNames(cls.BerthTypeForm, {}, [className])}
                layout={"vertical"}
                disabled={isLoading}
                fields={fields}
                onValuesChange={onValueChanged}
            >
                <Form.Item
                    required
                    name={"value"}
                    label={"Тип должности"}
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, укажите тип должности!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </>
    );
});
