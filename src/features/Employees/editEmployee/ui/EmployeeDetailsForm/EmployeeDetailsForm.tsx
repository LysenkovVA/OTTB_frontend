import { Berth } from "@/entities/Berth/model/types/Berth";
import { Department } from "@/entities/Department";
import {
    getEmployeeDetailsDataError,
    getEmployeeDetailsForm,
    getEmployeeDetailsIsDataLoading,
} from "@/entities/Employee/model/selectors/getEmployeeDetails";
import { employeeDetailsActions } from "@/entities/Employee/model/slice/employeeDetailsSlice";
import { Organization } from "@/entities/Organization";
import { getUserActiveWorkspaceId } from "@/entities/User";
import { fetchAllBerthes } from "@/features/Berthes/berthSelector/model/services/fetchAllBerthes/fetchAllBerthes";
import { BerthSelector } from "@/features/Berthes/berthSelector/ui/BerthSelector/BerthSelector";
import { DepartmentSelector } from "@/features/Departments/departmentSelector";
import { fetchAllDepartments } from "@/features/Departments/departmentSelector/model/services/fetchAllDepartments/fetchAllDepartments";
import { OrganizationSelector } from "@/features/Organizations/organizationSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FieldData } from "@/shared/types/FieldData";
import { EditableAvatar } from "@/shared/ui/EditableAvatar/EditableAvatar";
import {
    Alert,
    Col,
    DatePicker,
    Flex,
    Form,
    FormInstance,
    Input,
    Row,
    Tabs,
    TabsProps,
} from "antd";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import cls from "./EmployeeDetailsForm.module.scss";

interface EmployeeDetailsFormProps {
    className?: string;
    form: FormInstance;
}

export const EmployeeDetailsForm = memo((props: EmployeeDetailsFormProps) => {
    const { form } = props;

    const dispatch = useAppDispatch();
    const isLoading = useSelector(getEmployeeDetailsIsDataLoading);
    const error = useSelector(getEmployeeDetailsDataError);
    const employeeDetailsForm = useSelector(getEmployeeDetailsForm);
    const workspaceId = useSelector(getUserActiveWorkspaceId);

    const fields = useMemo((): FieldData[] => {
        return [
            { name: ["surname"], value: employeeDetailsForm?.surname ?? "" },
            { name: ["name"], value: employeeDetailsForm?.name ?? "" },
            {
                name: ["hireDate"],
                value: employeeDetailsForm?.hireDate
                    ? dayjs(employeeDetailsForm?.hireDate, [
                          "DD.MM.YYYY",
                          "YYYY-MM-DD",
                      ])
                    : dayjs(new Date()),
            },
            {
                name: ["dismissDate"],
                value:
                    dayjs(employeeDetailsForm?.dismissDate, "DD.MM.YYYY") ??
                    undefined,
            },
            { name: ["email"], value: employeeDetailsForm?.email ?? "" },
            { name: ["phone"], value: employeeDetailsForm?.phone ?? "" },
            { name: ["rank"], value: employeeDetailsForm?.rank ?? "" },
        ];
    }, [employeeDetailsForm]);

    const onValueChanged = useCallback(
        async (changedValues: any) => {
            Object.keys(changedValues).forEach((key) => {
                dispatch(
                    employeeDetailsActions.setFormData({
                        ...employeeDetailsForm,
                        [key]: changedValues[key],
                    }),
                );
            });
        },
        [dispatch, employeeDetailsForm],
    );

    const onChangeAvatar = useCallback(
        (value: string) => {
            dispatch(
                employeeDetailsActions.setEmployeeDetailsFormDataAvatar(value),
            );
        },
        [dispatch],
    );

    const onDeleteAvatar = useCallback(() => {
        dispatch(
            employeeDetailsActions.setEmployeeDetailsFormDataAvatar(undefined),
        );
    }, [dispatch]);

    const onChangeBerth = useCallback(
        (value: Berth | undefined) => {
            dispatch(
                employeeDetailsActions.setFormData({
                    ...employeeDetailsForm,
                    berth: value,
                }),
            );
        },
        [dispatch, employeeDetailsForm],
    );

    const onChangeDepartment = useCallback(
        (value: Department | undefined) => {
            dispatch(
                employeeDetailsActions.setFormData({
                    ...employeeDetailsForm,
                    department: value,
                }),
            );
        },
        [dispatch, employeeDetailsForm],
    );

    const onChangeOrganization = useCallback(
        async (value: Organization | undefined) => {
            // Установка организации и Сброс значений селекторов
            dispatch(
                employeeDetailsActions.setFormData({
                    ...employeeDetailsForm,
                    organization: value,
                    department: undefined,
                    berth: undefined,
                }),
            );

            if (value) {
                // Если значение поменялось, меняем значения селекторов
                // Подразделения
                dispatch(
                    fetchAllDepartments({
                        workspaceId,
                        organizationId: value.id,
                        replaceData: true,
                    }),
                );

                // Должности
                dispatch(
                    fetchAllBerthes({
                        workspaceId,
                        organizationId: value.id,
                        replaceData: true,
                    }),
                );
            }
        },
        [dispatch, employeeDetailsForm, workspaceId],
    );

    const workContent = (
        <>
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Form.Item label={"Организация"}>
                        <OrganizationSelector
                            value={employeeDetailsForm?.organization}
                            onValueChanged={onChangeOrganization}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Form.Item label={"Подразделение"}>
                        <DepartmentSelector
                            disabled={
                                employeeDetailsForm?.organization === undefined
                            }
                            value={employeeDetailsForm?.department}
                            onValueChanged={onChangeDepartment}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Form.Item label={"Должность"}>
                        <BerthSelector
                            disabled={
                                employeeDetailsForm?.organization === undefined
                            }
                            value={employeeDetailsForm?.berth}
                            onValueChanged={onChangeBerth}
                        />
                    </Form.Item>
                </Col>
                {employeeDetailsForm?.berth?.hasRank && (
                    <Col span={12}>
                        <Form.Item label={"Разряд"} name={"rank"}>
                            <Input
                                disabled={
                                    employeeDetailsForm?.organization ===
                                    undefined
                                }
                            />
                        </Form.Item>
                    </Col>
                )}
            </Row>
            <Form.Item label={"Принят на работу"} name={"hireDate"}>
                <DatePicker format={"DD.MM.YYYY"} />
            </Form.Item>
        </>
    );

    const contactsContent = (
        <>
            <Row gutter={[8, 8]}>
                <Col span={8}>
                    <Form.Item
                        label={"Телефон"}
                        name={"phone"}
                        rules={[
                            {
                                message: "Телефон указан неверно",
                            },
                        ]}
                    >
                        <Input inputMode={"tel"} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                <Col span={8}>
                    <Form.Item
                        label={"E-mail"}
                        name={"email"}
                        rules={[
                            {
                                required: false,
                                type: "email",
                                message:
                                    "Пожалуйста, укажите корректный E-mail!",
                            },
                        ]}
                    >
                        <Input inputMode={"email"} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );

    const items: TabsProps["items"] = [
        { key: "1", label: "Работа", children: workContent },
        { key: "2", label: "Контакты", children: contactsContent },
    ];

    return (
        <>
            {error && <Alert type={"error"} message={error} />}
            <Form
                form={form}
                id={"employeeDetailsForm"}
                layout={"vertical"}
                disabled={isLoading}
                fields={fields}
                onValuesChange={onValueChanged}
            >
                <Row gutter={[8, 8]}>
                    <Col span={12}>
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
                                    message:
                                        "Пожалуйста, укажите имя и отчество!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Flex justify={"flex-end"}>
                            <EditableAvatar
                                className={cls.avatar}
                                size={200}
                                shape={"square"}
                                // style={{ backgroundColor: "#87d068" }}
                                file={employeeDetailsForm?.avatar}
                                onChangeAvatar={onChangeAvatar}
                                onDeleteAvatar={onDeleteAvatar}
                            />
                        </Flex>
                    </Col>
                </Row>
                <Tabs defaultActiveKey={"1"} items={items} />
            </Form>
        </>
    );
});
