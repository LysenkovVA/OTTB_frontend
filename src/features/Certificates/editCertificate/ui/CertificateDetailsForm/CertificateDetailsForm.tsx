import {
    getCertificateDetailsError,
    getCertificateDetailsForm,
    getCertificateDetailsIsLoading,
} from "@/entities/Certificate/model/selectors/certificateSelectors";
import { certificateDetailsActions } from "@/entities/Certificate/model/slice/certificateDetailsSlice";
import { CertificateType } from "@/entities/CertificateType";
import { getUserActiveWorkspace } from "@/entities/User";
import { CertificateTypeSelector } from "@/features/CertificateTypes/certificateTypeSelector";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { Alert, DatePicker, Form, FormInstance, Input } from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./CertificateDetailsForm.module.scss";

export interface CertificateDetailsFormProps {
    className?: string;
    form: FormInstance;
}

export const CertificateDetailsForm = memo(
    (props: CertificateDetailsFormProps) => {
        const { className, form } = props;

        const dispatch = useAppDispatch();
        const isLoading = useSelector(getCertificateDetailsIsLoading);
        const error = useSelector(getCertificateDetailsError);
        const certificateDetailsForm = useSelector(getCertificateDetailsForm);
        const activeWorkspace = useSelector(getUserActiveWorkspace);

        const fields = useMemo((): FieldData[] => {
            if (!certificateDetailsForm) {
                return [];
            }

            return [
                { name: ["number"], value: certificateDetailsForm?.number },
                {
                    name: ["startDate"],
                    value: certificateDetailsForm?.startDate,
                },
                { name: ["group"], value: certificateDetailsForm?.group },
            ];
        }, [certificateDetailsForm]);

        const onValueChanged = useCallback(
            async (changedValues: any) => {
                if (!certificateDetailsForm) {
                    return;
                }

                Object.keys(changedValues).forEach((key) => {
                    dispatch(
                        certificateDetailsActions.setFormData({
                            ...certificateDetailsForm,
                            [key]: changedValues[key],
                        }),
                    );
                });
            },
            [certificateDetailsForm, dispatch],
        );

        const onChangeCertificateType = useCallback(
            (value: CertificateType | undefined) => {
                if (certificateDetailsForm) {
                    dispatch(
                        certificateDetailsActions.setFormData({
                            ...certificateDetailsForm,
                            certificateType: value,
                        }),
                    );
                }
            },
            [certificateDetailsForm, dispatch],
        );

        return (
            <>
                {error && <Alert type={"error"} message={error} />}
                <Form
                    id={"certificateDetailsForm"}
                    form={form}
                    preserve={false} // Чтобы поля в модалке сбрасывались
                    rootClassName={classNames(cls.CertificateDetailsForm, {}, [
                        className,
                    ])}
                    layout={"vertical"}
                    disabled={isLoading}
                    fields={fields}
                    onValuesChange={onValueChanged}
                >
                    <Form.Item required label={"Тип удостоверения"}>
                        <CertificateTypeSelector
                            value={certificateDetailsForm?.certificateType}
                            onValueChanged={onChangeCertificateType}
                        />
                    </Form.Item>
                    <Form.Item
                        required
                        name={"number"}
                        label={"Номер"}
                        rules={[
                            {
                                required: true,
                                message: "Пожалуйста, укажите номер!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        required
                        name={"startDate"}
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
                    <Form.Item name={"group"} label={"Группа"}>
                        <Input />
                    </Form.Item>
                </Form>
            </>
        );
    },
);
