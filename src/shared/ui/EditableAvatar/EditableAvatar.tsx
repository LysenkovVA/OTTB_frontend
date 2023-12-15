import { downloadFile, File } from "@/entities/File";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    CloseCircleFilled,
    UserAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    AvatarProps,
    Button,
    Flex,
    Popconfirm,
    Skeleton,
    Upload,
} from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import cls from "./EditableAvatar.module.scss";

type AvProps = Omit<AvatarProps, "className">;

interface EditableAvatarProps extends AvProps {
    className?: string;
    file: File | undefined;
    onChangeAvatar?: (value: string) => void;
    onDeleteAvatar?: () => void;
    canEdit?: boolean;
}

export const EditableAvatar = memo((props: EditableAvatarProps) => {
    const {
        className,
        file,
        onChangeAvatar,
        onDeleteAvatar,
        canEdit = true,
        ...otherProps
    } = props;

    const [avatar, setAvatar] = useState<string | undefined>("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook") {
            setIsLoading(true);

            if (file?.id) {
                dispatch(downloadFile({ fileId: file.id }))
                    .then((data) => {
                        setAvatar(data.payload);
                    })
                    .catch(() => {
                        setAvatar(undefined);
                        setHasError(true);
                    })
                    .finally(() => {});
            } else {
                setAvatar(undefined);
            }

            setIsLoading(false);
        }
    }, [dispatch, file, file?.id]);

    const onDeleteClick = useCallback(() => {
        setAvatar(undefined);
        onChangeAvatar?.("");
        onDeleteAvatar?.();
    }, [onChangeAvatar, onDeleteAvatar]);

    if (isLoading) {
        return (
            <Skeleton.Avatar
                rootClassName={classNames(cls.EditableAvatar, {}, [className])}
                shape={"square"}
                size={80}
                active
            />
        );
    }

    if (hasError) {
        return (
            <Avatar
                className={classNames(cls.EditableAvatar, {}, [className])}
                icon={<CloseCircleFilled />}
                {...otherProps}
            />
        );
    }

    if (!canEdit) {
        return (
            <Avatar
                className={classNames(cls.EditableAvatar, {}, [className])}
                icon={!avatar && <UserOutlined />}
                src={avatar}
                {...otherProps}
            />
        );
    }

    return (
        <Flex vertical gap={0} justify={"center"} align={"center"}>
            <Upload
                showUploadList={false}
                beforeUpload={async (file) => {
                    const arrayBufferView = new Uint8Array(
                        await file.arrayBuffer(),
                    );
                    const blob = new Blob([arrayBufferView], {
                        type: "image/jpeg",
                    });
                    const urlCreator = window.URL || window.webkitURL;
                    const imageUrl = urlCreator.createObjectURL(blob);
                    setAvatar(imageUrl);
                    onChangeAvatar?.(imageUrl);
                    return false;
                }}
            >
                <Avatar
                    className={classNames(cls.EditableAvatar, {}, [className])}
                    icon={!avatar && <UserAddOutlined />}
                    src={avatar}
                    {...otherProps}
                />
            </Upload>
            {avatar && (
                <Popconfirm
                    title="Удаление"
                    description="Вы точно хотите удалить аватар?"
                    okText="Да"
                    cancelText="Нет"
                    onConfirm={onDeleteClick}
                >
                    <Button type={"link"} danger>
                        {"Удалить"}
                    </Button>
                </Popconfirm>
            )}
        </Flex>
    );
});
