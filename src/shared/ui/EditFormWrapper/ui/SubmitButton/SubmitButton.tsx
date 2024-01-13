import { Button, ButtonProps, Form, FormInstance } from "antd";
import { ReactNode, useEffect, useState } from "react";

type SBProps = Omit<ButtonProps, "title" | "form" | "icon" | "onClick">;

export interface SubmitButtonProps extends SBProps {
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
    ...otherProps
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
            onClick={(e) => {
                form?.submit();
                onClick?.();
            }}
            disabled={!submittable}
            {...otherProps}
        >
            {title}
        </Button>
    );
};
