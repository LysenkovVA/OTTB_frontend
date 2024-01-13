import { downloadFile, File } from "@/entities/File";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    CloseOutlined,
    DeleteOutlined,
    LoadingOutlined,
    PictureOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import {
    Image as AntImage,
    Flex,
    ImageProps,
    Modal,
    Typography,
    Upload,
} from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import cls from "./AppImage.module.scss";

type ImgProps = Omit<
    ImageProps,
    "className" | "fallback" | "onClick" | "src" | "srcSet"
>;

export interface AppImageProps extends ImgProps {
    className?: string;
    file?: File | undefined;
    onImageChange?: (value: string) => void;
    // onImageDelete?: () => void;
    canEdit?: boolean;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        file,
        alt = "Изображение отсутствует",
        width,
        height,
        preview = false,
        onImageChange,
        canEdit = true,
        ...otherProps
    } = props;

    const dispatch = useAppDispatch();

    const [picture, setPicture] = useState<string | undefined>("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (__PROJECT_ENV__ !== "storybook") {
            setIsLoading(true);

            if (!picture && file?.id) {
                dispatch(downloadFile({ fileId: file.id }))
                    .then((data) => {
                        setPicture(data.payload);
                    })
                    .catch(() => {
                        setPicture(undefined);
                        setHasError(true);
                    })
                    .finally(() => {});
            }
            setIsLoading(false);
        }
    }, [dispatch, file, file?.id, picture]);

    const onDelete = useCallback(() => {
        setPicture(undefined);
        setModalOpen(false);
    }, []);

    if (!file && !picture) {
        return canEdit ? (
            <Flex
                rootClassName={classNames(cls.AppImage, {}, [className])}
                style={{ height }}
                align={"center"}
                justify={"center"}
            >
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
                        setPicture(imageUrl);
                        onImageChange?.(imageUrl);
                        return false;
                    }}
                >
                    <PlusCircleOutlined
                        style={{
                            color: "lightgray",
                            fontSize: `calc(${height}px - 10px)`,
                            display: "block",
                            padding: "3px", // Половина отнимаемых пикселей fontsize минус толщина рамки
                        }}
                    />
                </Upload>
            </Flex>
        ) : (
            <Flex
                rootClassName={classNames(cls.AppImage, {}, [className])}
                style={{ height }}
                align={"center"}
                justify={"center"}
            >
                <PictureOutlined
                    style={{
                        color: "lightgray",
                        fontSize: `calc(${height}px - 10px)`,
                        display: "block",
                        padding: "3px", // Половина отнимаемых пикселей fontsize минус толщина рамки
                    }}
                />
            </Flex>
        );
    }

    if (isLoading && file) {
        return (
            <div
                className={classNames(cls.AppImage, {}, [className])}
                style={{ height }}
            >
                <LoadingOutlined
                    style={{
                        color: "gray",
                        fontSize: `calc(${height}px - 10px)`,
                        display: "block",
                        padding: "3px", // Половина отнимаемых пикселей fontsize минус толщина рамки
                    }}
                />
            </div>
        );
    }

    if (hasError && file) {
        return (
            <div className={classNames(cls.AppImage, {}, [className])}>
                <CloseOutlined
                    style={{
                        color: "red",
                        fontSize: height,
                        display: "block",
                        padding: "3px", // Половина отнимаемых пикселей fontsize минус толщина рамки
                    }}
                />
            </div>
        );
    }

    if (!canEdit) {
        return (
            <div className={classNames(cls.AppImage, {}, [className])}>
                <Flex justify={"center"} align={"center"}>
                    <AntImage
                        preview={preview}
                        height={height}
                        src={picture}
                        alt={alt}
                        {...otherProps}
                    />
                </Flex>
            </div>
        );
    }

    return (
        <div className={classNames(cls.AppImage, {}, [className])}>
            <Flex justify={"center"} align={"center"}>
                <Modal
                    title="Удаление"
                    centered
                    open={modalOpen}
                    onOk={onDelete}
                    onCancel={() => setModalOpen(false)}
                    cancelText={"Нет"}
                    okText={"Да"}
                >
                    <Typography.Text>{"Удалить изображение?"}</Typography.Text>
                </Modal>
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
                        setPicture(imageUrl);
                        onImageChange?.(imageUrl);
                        return false;
                    }}
                >
                    <AntImage
                        preview={preview}
                        height={height}
                        src={picture}
                        alt={alt}
                        {...otherProps}
                    />
                </Upload>
            </Flex>
            <DeleteOutlined
                className={cls.deleteButton}
                onClick={() => setModalOpen(true)}
            />
            {/*<Button className={cls.deleteButton} icon={<DeleteOutlined />} />*/}
        </div>
    );
});
