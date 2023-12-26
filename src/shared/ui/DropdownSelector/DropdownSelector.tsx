import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Empty, Flex, Select, SelectProps } from "antd";
import { memo, useCallback } from "react";

interface DropdownSelectorType {
    label: string;
    value: string;
}

// Исключаем опции из свойств SelectProps
type DDSelectorProps = Omit<
    SelectProps,
    "options" | "children" | "value" | "disabled"
>;

interface DropdownSelectorProps extends DDSelectorProps {
    reducers: ReducersList;
    value: DropdownSelectorType[];
    onValueChanged: (id: string | undefined) => void;
    isLoading: boolean;
    error?: string;
    options: DropdownSelectorType[];
    onAdd?: () => void;
    disabled?: boolean;
}

export const DropdownSelector = memo((props: DropdownSelectorProps) => {
    const {
        className,
        reducers,
        options,
        value,
        isLoading,
        onValueChanged,
        error,
        onAdd,
        disabled,
        ...otherProps
    } = props;

    const onChange = useCallback(
        (value: DropdownSelectorType[]) => {
            const ddt = value as unknown as DropdownSelectorType;
            if (ddt) {
                onValueChanged(ddt.value);
            } else {
                onValueChanged(undefined);
            }
        },
        [onValueChanged],
    );

    const onClear = useCallback(() => {
        onValueChanged(undefined);
    }, [onValueChanged]);

    // const disabled = useCallback(() => {
    //     if (isLoading || error) {
    //         return true;
    //     }
    //
    //     return false;
    // }, [error, isLoading]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Flex>
                <Select
                    showSearch
                    allowClear={true}
                    labelInValue
                    virtual={false}
                    // Без этого поиск не показывал найдненное
                    filterOption={(inputValue, option) =>
                        option!
                            .label!.toLocaleString()
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                    }
                    options={options}
                    value={value}
                    onChange={onChange}
                    onClear={onClear}
                    loading={isLoading}
                    disabled={disabled}
                    placeholder={error}
                    notFoundContent={
                        <Empty
                            description={false}
                            style={{ paddingBottom: 10 }}
                        />
                    }
                    // dropdownRender={(menu) => (
                    //     <>
                    //         {menu}
                    //         <Flex
                    //             justify={"center"}
                    //             align={"center"}
                    //             style={{ paddingTop: 8 }}
                    //         >
                    //             <Button
                    //                 icon={<PlusOutlined />}
                    //                 type={"link"}
                    //                 onClick={() => {
                    //                     onAdd?.();
                    //                 }}
                    //             >
                    //                 {"Добавить"}
                    //             </Button>
                    //         </Flex>
                    //     </>
                    // )}
                    {...otherProps}
                />
                <Button
                    type={"link"}
                    icon={<PlusCircleOutlined />}
                    disabled={disabled}
                    onClick={() => {
                        onAdd?.();
                    }}
                />
            </Flex>
        </DynamicModuleLoader>
    );
});
