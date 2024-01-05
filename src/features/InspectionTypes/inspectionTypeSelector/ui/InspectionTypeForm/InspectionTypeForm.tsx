import {
    getInspectionTypeDetailsError,
    getInspectionTypeDetailsForm,
    getInspectionTypeDetailsIsLoading,
    inspectionTypeDetailsActions,
} from "@/entities/InspectionType";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, Form, FormInstance, Input } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./InspectionTypeForm.module.scss";

export interface InspectionTypeFormProps {
    className?: string;
    form: FormInstance;
}

export const InspectionTypeForm = memo((props: InspectionTypeFormProps) => {
    const { className, form } = props;

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getInspectionTypeDetailsIsLoading);
    const error = useSelector(getInspectionTypeDetailsError);
    const detailsForm = useSelector(getInspectionTypeDetailsForm);

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
                    inspectionTypeDetailsActions.setFormData({
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
                id={"inspectionTypeDetailsForm"}
                form={form}
                preserve={false} // Чтобы поля в модалке сбрасывались
                rootClassName={classNames(cls.InspectionTypeForm, {}, [
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
                    label={"Тип проверки"}
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, укажите тип проверки!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </>
    );
});
