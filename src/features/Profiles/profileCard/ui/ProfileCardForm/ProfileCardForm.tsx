import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import { DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { getProfileFormData } from "../../model/selectors/profileSelectors";
import { profileActions } from "../../model/slice/profileSlice";
import cls from "./ProfileCardForm.module.scss";

interface ProfileCardFormProps {
    className?: string;
}

export const ProfileCardForm = memo((props: ProfileCardFormProps) => {
    const dispatch = useAppDispatch();
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
                            profileActions.setProfileFormData({
                                ...profileFormData,
                                surname: changedValues[key],
                            }),
                        );
                        break;
                    case "name":
                        dispatch(
                            profileActions.setProfileFormData({
                                ...profileFormData,
                                name: changedValues[key],
                            }),
                        );
                        break;
                    case "birthDate":
                        dispatch(
                            profileActions.setProfileFormData({
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
        dispatch(profileActions.setRemoveAvatarOnUpdate(true));
    }, [dispatch]);

    return (
        <Form
            id={"profileCardForm"}
            layout={"vertical"}
            fields={fields}
            onValuesChange={onValueChanged}
        >
            <Form.Item className={cls.avatar}>
                <EditableAvatar
                    file={profileFormData.avatar}
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
                <DatePicker placeholder={"Укажите ДР"} format={"DD.MM.YYYY"} />
            </Form.Item>
        </Form>
    );
});
