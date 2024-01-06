import {
    constructionObjectDetailsActions,
    getConstructionObjectDetails,
    getConstructionObjectDetailsError,
    getConstructionObjectDetailsIsLoading,
} from "@/entities/ConstructionObject";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, Form, FormInstance, Input } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./ConstructionObjectForm.module.scss";

export interface ConstructionObjectFormProps {
    className?: string;
    form: FormInstance;
}

export const ConstructionObjectForm = memo(
    (props: ConstructionObjectFormProps) => {
        const { className, form } = props;

        const dispatch = useAppDispatch();
        const isLoading = useSelector(getConstructionObjectDetailsIsLoading);
        const error = useSelector(getConstructionObjectDetailsError);
        const detailsForm = useSelector(getConstructionObjectDetails);

        const fields = useMemo((): FieldData[] => {
            if (!detailsForm) {
                return [];
            }

            return [{ name: ["name"], value: detailsForm?.name }];
        }, [detailsForm]);

        const onValueChanged = useCallback(
            async (changedValues: any) => {
                if (!detailsForm) {
                    return;
                }

                Object.keys(changedValues).forEach((key) => {
                    dispatch(
                        constructionObjectDetailsActions.setFormData({
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
                    rootClassName={classNames(cls.ConstructionObjectForm, {}, [
                        className,
                    ])}
                    layout={"vertical"}
                    disabled={isLoading}
                    fields={fields}
                    onValuesChange={onValueChanged}
                >
                    <Form.Item
                        required
                        name={"name"}
                        label={"Объект"}
                        rules={[
                            {
                                required: true,
                                message:
                                    "Пожалуйста, укажите название объекта!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </>
        );
    },
);
