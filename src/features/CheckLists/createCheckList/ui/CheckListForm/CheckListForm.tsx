import {
    CheckList,
    checkListDetailsActions,
    checkListDetailsReducer,
    createCheckList,
    getCheckListDetailsError,
    getCheckListDetailsForm,
    getCheckListDetailsIsLoading,
} from "@/entities/CheckList";
import { getUserActiveWorkspace } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import {
    MinusCircleOutlined,
    PlusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import {
    Alert,
    Button,
    Col,
    Divider,
    Form,
    FormInstance,
    Input,
    Row,
    Typography,
} from "antd";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./CheckListForm.module.scss";

export interface CheckListFormProps {
    className?: string;
    form: FormInstance;
    onFinish: () => void;
}

const reducers: ReducersList = {
    checkListDetailsSchema: checkListDetailsReducer,
};

export const CheckListForm = memo((props: CheckListFormProps) => {
    const { className, form, onFinish } = props;

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getCheckListDetailsIsLoading);
    const error = useSelector(getCheckListDetailsError);
    const detailsForm = useSelector(getCheckListDetailsForm);
    const activeWorkspace = useSelector(getUserActiveWorkspace);

    const fields = useMemo((): FieldData[] => {
        if (!detailsForm) {
            return [];
        }

        // ДОБАВЛЯЕМ ПОЛЯ С СОБЛЮДЕНИЕМ ВСЕЙ ВЛОЖЕННОСТИ ОБЪЕКТОВ
        const fieldData: FieldData[] = [];

        fieldData.push({ name: ["name"], value: detailsForm?.name });
        fieldData.push({
            name: ["description"],
            value: detailsForm?.description,
        });

        detailsForm.checkListGroups?.forEach((checkListGroup, groupIndex) => {
            // Добавляем поля с группами
            fieldData.push({
                name: ["checkListGroups", groupIndex, "value"],
                value: checkListGroup.value,
            });

            // Добавляем поля с проверками групп
            checkListGroup.checks?.forEach((check, checkIndex) => {
                fieldData.push({
                    name: [
                        "checkListGroups",
                        groupIndex,
                        "checks",
                        checkIndex,
                        "description",
                    ],
                    value: check.description,
                });

                fieldData.push({
                    name: [
                        "checkListGroups",
                        groupIndex,
                        "checks",
                        checkIndex,
                        "normativeDocument",
                    ],
                    value: check.normativeDocument,
                });

                fieldData.push({
                    name: [
                        "checkListGroups",
                        groupIndex,
                        "checks",
                        checkIndex,
                        "isDeprecated",
                    ],
                    value: check.isDeprecated,
                });
            });
        });

        return fieldData;
    }, [detailsForm]);

    const onFinishForm = useCallback(
        (values: CheckList) => {
            dispatch(checkListDetailsActions.setFormData(values));

            if (detailsForm) {
                dispatch(
                    createCheckList({
                        data: values,
                        workspaceId: activeWorkspace?.id,
                    }),
                );
            }
            onFinish();
        },
        [activeWorkspace?.id, detailsForm, dispatch, onFinish],
    );

    const checksContent = (groupName: number) => (
        <Form.List name={[groupName, "checks"]}>
            {(checks, checkOptions) => (
                <>
                    {checks.map(
                        ({
                            key: checkKey,
                            name: checkName,
                            ...checkRestField
                        }) => (
                            <div key={checkKey}>
                                <Row gutter={[8, 0]} align={"top"}>
                                    <Col span={16} offset={1}>
                                        <Form.Item
                                            label={`${groupName + 1}.${
                                                checkName + 1
                                            }`}
                                            labelCol={{ span: 1 }}
                                            {...checkRestField}
                                            name={[checkName, "description"]}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Укажите описание",
                                                },
                                            ]}
                                        >
                                            <Input.TextArea
                                                placeholder={"Описание"}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            label={" "}
                                            colon={false}
                                            labelCol={{ span: 1 }}
                                            {...checkRestField}
                                            name={[
                                                checkName,
                                                "normativeDocument",
                                            ]}
                                        >
                                            <Input.TextArea
                                                placeholder={
                                                    "Нормативный документ"
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1}>
                                        <MinusCircleOutlined
                                            style={{
                                                color: "red",
                                            }}
                                            onClick={() =>
                                                checkOptions.remove(checkName)
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={[8, 8]} align={"top"}></Row>
                            </div>
                        ),
                    )}
                    <Row gutter={[8, 8]}>
                        <Col offset={1}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={() => checkOptions.add()}
                                    icon={<PlusCircleOutlined />}
                                >
                                    Добавить пункт
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}
        </Form.List>
    );

    const groupsContent = (
        <>
            <Divider orientation="left" orientationMargin={20}>
                <Typography.Title level={5}>Список проверок</Typography.Title>
            </Divider>
            <Form.List name={["checkListGroups"]}>
                {(groups, groupOptions) => (
                    <>
                        {groups.map(
                            ({
                                key: groupKey,
                                name: groupName,
                                ...restField
                            }) => (
                                <div key={groupKey}>
                                    <Form.Item
                                        label={`${groupName + 1}`}
                                        {...restField}
                                        name={[groupName, "value"]}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Укажите название группы",
                                            },
                                        ]}
                                    >
                                        <Row
                                            gutter={[8, 8]}
                                            align={"middle"}
                                            justify={"center"}
                                        >
                                            <Col span={23}>
                                                <Input
                                                    placeholder={
                                                        "Название группы"
                                                    }
                                                />
                                            </Col>
                                            <Col span={1}>
                                                <MinusCircleOutlined
                                                    style={{
                                                        color: "red",
                                                    }}
                                                    onClick={() =>
                                                        groupOptions.remove(
                                                            groupName,
                                                        )
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                    {checksContent(groupName)}
                                </div>
                            ),
                        )}
                        <Form.Item>
                            <Button
                                type="primary"
                                // block
                                onClick={() => groupOptions.add()}
                                icon={<PlusOutlined />}
                            >
                                Добавить группу
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </>
    );

    const onValueChanged = useCallback((changedValues: any) => {
        Object.keys(changedValues).forEach((key) => {
            console.log(JSON.stringify(changedValues));
        });
    }, []);

    const formContent = (
        <Form
            id={"checkListDetailsForm"}
            form={form}
            preserve={false}
            layout={"horizontal"}
            disabled={isLoading}
            fields={fields}
            onFinish={onFinishForm}
            onValuesChange={onValueChanged}
        >
            <Form.Item
                required
                name={"name"}
                label={"Название"}
                rules={[
                    {
                        required: true,
                        message: "Пожалуйста, укажите название",
                    },
                ]}
                labelCol={{ span: 2 }}
            >
                <Input placeholder={"Название списка"} />
            </Form.Item>
            <Form.Item
                labelCol={{ span: 2 }}
                name={"description"}
                label={"Описание"}
            >
                <Input.TextArea placeholder={"Описание..."} />
            </Form.Item>
            {groupsContent}
        </Form>
    );

    return (
        // <DynamicModuleLoader reducers={reducers}>
        <div className={classNames(cls.CheckListForm, {}, [className])}>
            {error && <Alert type={"error"} message={error} />}
            {formContent}
        </div>
        // </DynamicModuleLoader>
    );
});
