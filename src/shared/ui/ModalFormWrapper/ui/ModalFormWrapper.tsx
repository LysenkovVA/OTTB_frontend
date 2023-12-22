import { Form, FormInstance, Modal } from "antd";
import { ReactNode, memo, useEffect, useState } from "react";

export interface ModalFormWrapperProps {
    className?: string;
    children?: ReactNode;
    title?: string;
    isVisible?: boolean;
    onSave?: () => void;
    onCancel?: () => void;
    form?: FormInstance;
}

export const ModalFormWrapper = memo((props: ModalFormWrapperProps) => {
    const {
        className,
        isVisible,
        children,
        title = "",
        onSave,
        onCancel,
        form,
    } = props;

    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
        form?.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [form, values]);

    return (
        <Modal
            title={title}
            destroyOnClose={true}
            centered
            open={isVisible}
            onOk={onSave}
            okButtonProps={{ disabled: !submittable }}
            onCancel={onCancel}
            okText={"Сохранить"}
            cancelText={"Отмена"}
        >
            {children}
        </Modal>
    );
});
