import {
    getProfileDataError,
    getProfileDataIsLoading,
    getProfileFormData,
} from "@/entities/Profile/model/selectors/profileSelectors";
import { profileActions } from "@/entities/Profile/model/slice/profileSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import { Alert, DatePicker, Form, FormInstance, Input } from "antd";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./ProfileDetailsForm.module.scss";

interface ProfileDetailsFormProps {
    className?: string;
    form: FormInstance;
}

export const ProfileDetailsForm = memo((props: ProfileDetailsFormProps) => {
    const { form } = props;

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getProfileDataIsLoading);
    const error = useSelector(getProfileDataError);
    const profileFormData = useSelector(getProfileFormData);

    const fields = useMemo((): FieldData[] => {
        return [
            { name: ["surname"], value: profileFormData?.surname },
            { name: ["name"], value: profileFormData?.name },
            {
                name: ["birthDate"],
                value:
                    dayjs(profileFormData?.birthDate, [
                        "DD.MM.YYYY",
                        "YYYY-MM-DD",
                    ]) ?? undefined,
            },
        ];
    }, [
        profileFormData?.birthDate,
        profileFormData?.name,
        profileFormData?.surname,
    ]);

    const onValueChanged = useCallback(
        async (changedValues: any) => {
            const keys: string[] = Object.keys(changedValues);

            keys.forEach((key) => {
                switch (key) {
                    case "surname":
                        dispatch(
                            profileActions.setFormData({
                                ...profileFormData,
                                surname: changedValues[key],
                            }),
                        );
                        break;
                    case "name":
                        dispatch(
                            profileActions.setFormData({
                                ...profileFormData,
                                name: changedValues[key],
                            }),
                        );
                        break;
                    case "birthDate":
                        dispatch(
                            profileActions.setFormData({
                                ...profileFormData,
                                birthDate: changedValues[key],
                            }),
                        );
                        break;
                }
            });
        },
        [dispatch, profileFormData],
    );

    const onChangeAvatar = useCallback(
        (value: string) => {
            dispatch(profileActions.setProfileFormDataAvatar(value));
        },
        [dispatch],
    );

    const onDeleteAvatar = useCallback(() => {
        dispatch(profileActions.setProfileFormDataAvatar(undefined));
    }, [dispatch]);

    return (
        <>
            {error && <Alert type={"error"} message={error} />}
            <Form
                id={"profileCardForm"}
                form={form}
                disabled={isLoading}
                layout={"vertical"}
                fields={fields}
                onValuesChange={onValueChanged}
            >
                <Form.Item className={cls.avatar}>
                    <EditableAvatar
                        file={profileFormData?.avatar}
                        onChangeAvatar={onChangeAvatar}
                        onDeleteAvatar={onDeleteAvatar}
                        style={{ width: 150, height: 150 }}
                    />
                </Form.Item>
                <Form.Item
                    required
                    name={"surname"}
                    label={"Фамилия"}
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, укажите фамилию!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    required
                    label={"Имя и отчество"}
                    name={"name"}
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, укажите имя и отчество!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={"birthDate"} label={"Дата рождения"}>
                    <DatePicker
                        placeholder={"Укажите ДР"}
                        format={"DD.MM.YYYY"}
                    />
                </Form.Item>
            </Form>
        </>
    );
});
