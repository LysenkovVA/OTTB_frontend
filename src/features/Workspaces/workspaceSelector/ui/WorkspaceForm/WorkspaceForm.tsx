import {
    getWorkspaceDetailsError,
    getWorkspaceDetailsForm,
    getWorkspaceDetailsIsLoading,
    workspaceDetailsActions,
} from "@/entities/Workspace";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, Form, FormInstance, Input } from "antd";
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

        return [{ name: ["name"], value: detailsForm?.name }];
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
                    label={"Название"}
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, укажите название!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </>
    );
});
