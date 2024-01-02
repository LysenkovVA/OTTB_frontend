import {
    getInspectionDetailsError,
    getInspectionDetailsForm,
    getInspectionDetailsIsLoading,
} from "@/entities/Inspection/model/selectors/inspectionDetailsSelectors";
import { inspectionDetailsActions } from "@/entities/Inspection/model/slice/inspectionDetailsSlice";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, DatePicker, Form, FormInstance, Input, Switch } from "antd";
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

        // const onChangeCertificateType = useCallback(
        //     (value: CertificateType | undefined) => {
        //         if (certificateDetailsForm) {
        //             dispatch(
        //                 certificateDetailsActions.setFormData({
        //                     ...certificateDetailsForm,
        //                     certificateType: value,
        //                 }),
        //             );
        //         }
        //     },
        //     [certificateDetailsForm, dispatch],
        // );

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
                    {/* <Form.Item required label={"Тип удостоверения"}> */}
                    {/*     <CertificateTypeSelector */}
                    {/*         value={certificateDetailsForm?.certificateType} */}
                    {/*         onValueChanged={onChangeCertificateType} */}
                    {/*     /> */}
                    {/* </Form.Item> */}

                    {/* <Form.Item name={"group"} label={"Группа"}> */}
                    {/*     <Input /> */}
                    {/* </Form.Item> */}
                </Form>
            </>
        );
    },
);
