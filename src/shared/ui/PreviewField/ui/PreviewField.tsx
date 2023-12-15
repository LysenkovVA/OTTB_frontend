import { classNames } from "@/shared/lib/classNames/classNames";
import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { Flex, Typography } from "antd";
import * as React from "react";
import { memo } from "react";
import cls from "./PreviewField.module.scss";

interface PreviewFieldProps {
    className?: string;
    component:
        | React.ComponentType<
              CustomIconComponentProps | React.SVGProps<SVGSVGElement>
          >
        | React.ForwardRefExoticComponent<CustomIconComponentProps>;
    componentWidth?: number;
    componentHeight?: number;
    value: string | undefined;
}

export const PreviewField = memo((props: PreviewFieldProps) => {
    const { className, component, value, componentWidth, componentHeight } =
        props;
    return (
        <Flex className={classNames(cls.PreviewField, {}, [className])}>
            {component && (
                <Icon
                    component={component}
                    width={componentWidth ?? 30}
                    height={componentHeight ?? 30}
                    style={{ paddingRight: 5 }}
                />
            )}
            <Typography.Text className={value ? cls.hasValue : cls.noValue}>
                {value ?? "не задано"}
            </Typography.Text>
        </Flex>
    );
});
