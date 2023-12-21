import { Button, Form, FormInstance } from "antd";
import { ReactNode, useEffect, useState } from "react";

export interface SubmitButtonProps {
    title?: string;
    icon?: ReactNode;
    form?: FormInstance;
    onClick?: () => void;
}

export const SubmitButton = ({
    title,
    icon,
    form,
    onClick,
}: SubmitButtonProps) => {
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
        <Button
            icon={icon}
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            onClick={onClick}
        >
            {title}
        </Button>
    );
};
