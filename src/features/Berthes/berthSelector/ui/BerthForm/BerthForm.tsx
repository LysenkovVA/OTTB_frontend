import {
    berthDetailsActions,
    getBerthDetailsForm,
    getBerthDetailsIsLoading,
} from "@/entities/Berth";
import { BerthType, getBerthTypeDetailsError } from "@/entities/BerthType";
import { BerthTypeSelector } from "@/features/BerthTypes/berthTypeSelector";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, Form, FormInstance, Input, Switch } from "antd";
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

        return [
            { name: ["value"], value: detailsForm?.value },
            // { name: ["hasRank"], value: detailsForm?.hasRank },
        ];
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

    const onChangeBerthType = useCallback(
        (value: BerthType | undefined) => {
            if (detailsForm) {
                dispatch(
                    berthDetailsActions.setFormData({
                        ...detailsForm,
                        berthType: value,
                    }),
                );
            }
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
                <Form.Item required label={"Тип должности"}>
                    <BerthTypeSelector
                        value={detailsForm?.berthType}
                        onValueChanged={onChangeBerthType}
                    />
                </Form.Item>
                <Form.Item
                    required
                    name={"value"}
                    label={"Должность"}
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, укажите название должности!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    // name={"hasRank"}
                    label={"С разрядами"}
                >
                    <Switch
                        checked={detailsForm?.hasRank}
                        onChange={(checked) => {
                            if (detailsForm) {
                                dispatch(
                                    berthDetailsActions.setFormData({
                                        ...detailsForm,
                                        hasRank: checked,
                                    }),
                                );
                            }
                        }}
                    />
                </Form.Item>
            </Form>
        </>
    );
});
