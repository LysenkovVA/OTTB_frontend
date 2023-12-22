import {
    getDepartmentDetailsDataError,
    getDepartmentDetailsForm,
    getDepartmentDetailsIsDataLoading,
} from "@/features/Departments/departmentDetailsCard/model/selectors/departmentDetailsSelectors";
import { departmentDetailsActions } from "@/features/Departments/departmentDetailsCard/model/slice/departmentDetailsSlice";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, Col, Form, FormInstance, Input, Row } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./DepartmentForm.module.scss";

export interface DepartmentFormProps {
    className?: string;
    form: FormInstance;
}

export const DepartmentForm = memo((props: DepartmentFormProps) => {
    const { className, form } = props;

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getDepartmentDetailsIsDataLoading);
    const error = useSelector(getDepartmentDetailsDataError);
    const departmentDetailsForm = useSelector(getDepartmentDetailsForm);

    const fields = useMemo((): FieldData[] => {
        if (!departmentDetailsForm) {
            return [];
        }

        return [{ name: ["name"], value: departmentDetailsForm?.name }];
    }, [departmentDetailsForm]);

    const onValueChanged = useCallback(
        async (changedValues: any) => {
            if (!departmentDetailsForm) {
                return;
            }

            const keys: string[] = Object.keys(changedValues);

            keys.forEach((key) => {
                switch (key) {
                    case "name":
                        dispatch(
                            departmentDetailsActions.setFormData({
                                ...departmentDetailsForm,
                                name: changedValues[key],
                            }),
                        );
                        break;
                }
            });
        },
        [dispatch, departmentDetailsForm],
    );

    return (
        <>
            {error && <Alert type={"error"} message={error} />}
            <Form
                id={"departmentDetailsForm"}
                form={form}
                rootClassName={classNames(cls.DepartmentForm, {}, [className])}
                layout={"vertical"}
                disabled={isLoading}
                fields={fields}
                onValuesChange={onValueChanged}
            >
                <Row gutter={[8, 8]}>
                    <Col span={24}>
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
                    </Col>
                </Row>
            </Form>
        </>
    );
});
