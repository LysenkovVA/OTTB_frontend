import {
    getInspectionDetailsError,
    getInspectionDetailsForm,
    getInspectionDetailsIsLoading,
} from "@/entities/Inspection/model/selectors/inspectionDetailsSelectors";
import { inspectionDetailsActions } from "@/entities/Inspection/model/slice/inspectionDetailsSlice";
import { InspectionType } from "@/entities/InspectionType";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { InspectionTypeSelector } from "@/features/InspectionTypes/inspectionTypeSelector";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
    Alert,
    DatePicker,
    Form,
    FormInstance,
    Input,
    Switch,
    Tabs,
    TabsProps,
} from "antd";
import { memo, useCallback, useMemo } from "react";
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
        const workspaceId = useSelector(getUserActiveWorkspaceId);

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
                <Form.Item
                    required
                    name={"date"}
                    label={"Дата"}
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, укажите дату!",
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item>
                    <InspectionTypeSelector
                        value={detailsForm?.inspectionType}
                        onValueChanged={onChangeInspectionType}
                    />
                </Form.Item>
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
                <Form.Item
                    name={"dateOfElimination"}
                    label={"Срок устранения нарушений"}
                >
                    <DatePicker />
                </Form.Item>
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
                <Form.Item required name={"notes"} label={"Примечания"}>
                    <Input />
                </Form.Item>
            </>
        );

        const checkListContent = (
            <>
                <div>Check list content</div>
            </>
        );

        const items: TabsProps["items"] = [
            {
                key: "1",
                label: "Информация",
                children: infoContent,
                icon: <InfoCircleOutlined />,
            },
            // eslint-disable-next-line react/jsx-no-undef
            {
                key: "2",
                label: "Чек-лист",
                children: checkListContent,
                icon: <CheckCircleOutlined />,
            },
        ];

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
                    <Tabs
                        defaultActiveKey={"1"}
                        type={"line"}
                        centered
                        tabPosition={"right"}
                        items={items}
                    />
                </Form>
            </>
        );
    },
);
