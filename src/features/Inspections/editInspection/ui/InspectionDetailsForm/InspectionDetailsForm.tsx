import {
    getInspectionDetailsError,
    getInspectionDetailsForm,
    getInspectionDetailsIsLoading,
} from "@/entities/Inspection/model/selectors/inspectionDetailsSelectors";
import { inspectionDetailsActions } from "@/entities/Inspection/model/slice/inspectionDetailsSlice";
import { InspectionType } from "@/entities/InspectionType";
import { getUserActiveWorkspace } from "@/entities/User";
import { CreateCheckList } from "@/features/CheckLists/createCheckList";
import { InspectionTypeSelector } from "@/features/InspectionTypes/inspectionTypeSelector";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import {
    Alert,
    Button,
    Col,
    DatePicker,
    Form,
    FormInstance,
    Input,
    Row,
    Steps,
    Switch,
    message,
} from "antd";
import { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import cls from "./InspectionDetailsForm.module.scss";

export interface InspectionDetailsFormProps {
    className?: string;
    form: FormInstance;
}

export const InspectionDetailsForm = memo(
    (props: InspectionDetailsFormProps) => {
        const { className, form } = props;

        const dispatch = useAppDispatch();
        const isLoading = useSelector(getInspectionDetailsIsLoading);
        const error = useSelector(getInspectionDetailsError);
        const detailsForm = useSelector(getInspectionDetailsForm);
        const activeWorkspace = useSelector(getUserActiveWorkspace);

        const fields = useMemo((): FieldData[] => {
            if (!detailsForm) {
                return [];
            }

            return [
                { name: ["date"], value: detailsForm?.date },
                { name: ["isPenalty"], value: detailsForm?.isPenalty },
                { name: ["isCommitional"], value: detailsForm?.isCommitional },
                {
                    name: ["dateOfElimination"],
                    value: detailsForm?.dateOfElimination,
                },
                {
                    name: ["documentNumber"],
                    value: detailsForm?.documentNumber,
                },
                { name: ["documentDate"], value: detailsForm?.documentDate },
                { name: ["notes"], value: detailsForm?.notes },
            ];
        }, [detailsForm]);

        const onValueChanged = useCallback(
            async (changedValues: any) => {
                if (!detailsForm) {
                    return;
                }

                Object.keys(changedValues).forEach((key) => {
                    dispatch(
                        inspectionDetailsActions.setFormData({
                            ...detailsForm,
                            [key]: changedValues[key],
                        }),
                    );
                });
            },
            [detailsForm, dispatch],
        );

        const onChangeInspectionType = useCallback(
            (value: InspectionType | undefined) => {
                if (detailsForm) {
                    dispatch(
                        inspectionDetailsActions.setFormData({
                            ...detailsForm,
                            inspectionType: value,
                        }),
                    );
                }
            },
            [detailsForm, dispatch],
        );

        const infoContent = (
            <>
                {/*<Alert*/}
                {/*    message="Общая информация"*/}
                {/*    description="Укажите общую информацию о проверке"*/}
                {/*    type="info"*/}
                {/*/>*/}
                <Row gutter={[16, 16]} justify={"start"}>
                    <Col span={3}>
                        <Form.Item
                            required
                            name={"date"}
                            label={"Дата проверки"}
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, укажите дату!",
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label={"Тип проверки"}>
                            <InspectionTypeSelector
                                value={detailsForm?.inspectionType}
                                onValueChanged={onChangeInspectionType}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label={"Штрафная"}>
                            <Switch
                                checked={detailsForm?.isPenalty}
                                onChange={(checked) => {
                                    if (detailsForm) {
                                        inspectionDetailsActions.setFormData({
                                            ...detailsForm,
                                            isPenalty: checked,
                                        });
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label={"Комиссионная"}>
                            <Switch
                                checked={detailsForm?.isCommitional}
                                onChange={(checked) => {
                                    if (detailsForm) {
                                        inspectionDetailsActions.setFormData({
                                            ...detailsForm,
                                            isCommitional: checked,
                                        });
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item required name={"notes"} label={"Примечания"}>
                    <Input.TextArea />
                </Form.Item>
            </>
        );

        const checkListContent = (
            <>
                <CreateCheckList />
            </>
        );

        const documentContent = (
            <>
                <Form.Item
                    required
                    name={"documentNumber"}
                    label={"Номер документа"}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={"documentDate"} label={"Дата документа"}>
                    <DatePicker />
                </Form.Item>
            </>
        );

        const steps = [
            {
                title: "Общая информация",
                content: infoContent,
            },
            {
                title: "Чек-лист",
                content: checkListContent,
            },
            {
                title: "Итоговый документ",
                content: documentContent,
            },
        ];

        const [current, setCurrent] = useState(0);

        const next = () => {
            setCurrent(current + 1);
        };

        const prev = () => {
            setCurrent(current - 1);
        };

        const items = steps.map((item) => ({
            key: item.title,
            title: item.title,
        }));

        return (
            <>
                {error && <Alert type={"error"} message={error} />}
                <Form
                    id={"certificateDetailsForm"}
                    form={form}
                    preserve={false} // Чтобы поля в модалке сбрасывались
                    rootClassName={classNames(cls.InspectionDetailsForm, {}, [
                        className,
                    ])}
                    layout={"vertical"}
                    disabled={isLoading}
                    fields={fields}
                    onValuesChange={onValueChanged}
                >
                    <Steps
                        current={current}
                        items={items}
                        direction={"horizontal"}
                    />
                    <div style={{ marginTop: 24 }}>
                        {steps[current].content}
                    </div>
                    <div style={{ marginTop: 24 }}>
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                Дальше
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button
                                type="primary"
                                onClick={() =>
                                    message.success("Processing complete!")
                                }
                            >
                                Завершить
                            </Button>
                        )}
                        {current > 0 && (
                            <Button
                                style={{ margin: "0 8px" }}
                                onClick={() => prev()}
                            >
                                Назад
                            </Button>
                        )}
                    </div>
                </Form>
            </>
        );
    },
);
