import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Empty,
    Flex,
    Form,
    Input,
    Modal,
    Select,
    SelectProps,
} from "antd";
import { memo, useCallback, useState } from "react";

interface DropdownSelectorType {
    label: string;
    value: string;
}

// Исключаем опции из свойств SelectProps
type DDSelectorProps = Omit<SelectProps, "options" | "children" | "value">;

interface DropdownSelectorProps extends DDSelectorProps {
    reducers: ReducersList;
    value: DropdownSelectorType[];
    onValueChanged: (id: string | undefined) => void;
    isLoading: boolean;
    error?: string;
    options: DropdownSelectorType[];
    onAdd?: () => void;
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
        ...otherProps
    } = props;

    const [modalOpen, setModalOpen] = useState(false);

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

    const disabled = useCallback(() => {
        if (isLoading || error) {
            return true;
        }

        return false;
    }, [error, isLoading]);

    const onAddClick = useCallback(() => {
        setModalOpen(true);

        onAdd?.();
    }, [onAdd]);

    const modalDialog = (
        <Modal
            title="Укажите значение"
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
            okText={"Сохранить"}
            cancelText={"Отмена"}
        >
            <Form key={"modalForm"}>
                <Form.Item label={"Значение"}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
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
                disabled={disabled()}
                placeholder={error}
                notFoundContent={
                    <Empty description={false} style={{ paddingBottom: 10 }} />
                }
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Flex justify={"center"} align={"center"}>
                            <Button
                                icon={<PlusOutlined />}
                                type={"primary"}
                                onClick={onAddClick}
                            >
                                {"Добавить"}
                            </Button>
                        </Flex>
                    </>
                )}
                {...otherProps}
            />
            {modalDialog}
        </DynamicModuleLoader>
    );
});
