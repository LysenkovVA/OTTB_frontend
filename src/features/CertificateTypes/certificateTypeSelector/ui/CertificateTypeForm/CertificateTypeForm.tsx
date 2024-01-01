import {
    certificateTypeDetailsActions,
    getCertificateTypeDetailsError,
    getCertificateTypeDetailsForm,
    getCertificateTypeDetailsIsLoading,
} from "@/entities/CertificateType";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, Form, FormInstance, Input, Segmented, Switch } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./CertificateTypeForm.module.scss";

export interface CertificateTypeFormProps {
    className?: string;
    form: FormInstance;
}

export const CertificateTypeForm = memo((props: CertificateTypeFormProps) => {
    const { className, form } = props;

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getCertificateTypeDetailsIsLoading);
    const error = useSelector(getCertificateTypeDetailsError);
    const detailsForm = useSelector(getCertificateTypeDetailsForm);

    const fields = useMemo((): FieldData[] => {
        if (!detailsForm) {
            return [];
        }

        return [
            { name: ["value"], value: detailsForm?.value },
            {
                name: ["durationAtMonths"],
                value: detailsForm?.durationAtMonths,
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
                    certificateTypeDetailsActions.setFormData({
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
                id={"CertificateTypeDetailsForm"}
                form={form}
                preserve={false} // Чтобы поля в модалке сбрасывались
                rootClassName={classNames(cls.CertificateTypeForm, {}, [
                    className,
                ])}
                layout={"vertical"}
                disabled={isLoading}
                fields={fields}
                onValuesChange={onValueChanged}
            >
                <Form.Item
                    required
                    name={"value"}
                    label={"Тип удостоверения"}
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, укажите тип удостоверения!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label={"Есть группы"}>
                    <Switch
                        checked={detailsForm?.hasGroups}
                        onChange={(checked) => {
                            if (detailsForm) {
                                dispatch(
                                    certificateTypeDetailsActions.setFormData({
                                        ...detailsForm,
                                        hasGroups: checked,
                                    }),
                                );
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item label={"Период действия"}>
                    <Segmented
                        options={[
                            { label: "Бессрочно", value: "Бессрочно" },
                            { label: "Период", value: "Период" },
                        ]}
                        onChange={(value) => {
                            switch (value.toString()) {
                                case "Бессрочно":
                                    if (detailsForm) {
                                        dispatch(
                                            certificateTypeDetailsActions.setFormData(
                                                {
                                                    ...detailsForm,
                                                    isUnlimited: true,
                                                },
                                            ),
                                        );
                                    }
                                    break;

                                case "Период":
                                    if (detailsForm) {
                                        dispatch(
                                            certificateTypeDetailsActions.setFormData(
                                                {
                                                    ...detailsForm,
                                                    isUnlimited: false,
                                                },
                                            ),
                                        );
                                    }
                                    break;
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item name={"durationAtMonths"}>
                    <Input />
                </Form.Item>
            </Form>
        </>
    );
});
