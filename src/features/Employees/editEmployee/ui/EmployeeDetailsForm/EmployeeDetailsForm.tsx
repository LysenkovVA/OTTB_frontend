import { Berth } from "@/entities/Berth/model/types/Berth";
import { Department } from "@/entities/Department";
import {
    getEmployeeDetailsDataError,
    getEmployeeDetailsForm,
    getEmployeeDetailsFormSelectedOrganization,
    getEmployeeDetailsIsDataLoading,
} from "@/entities/Employee/model/selectors/getEmployeeDetails";
import { employeeDetailsActions } from "@/entities/Employee/model/slice/employeeDetailsSlice";
import { Organization } from "@/entities/Organization";
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
    Divider,
    Flex,
    Form,
    FormInstance,
    Input,
    Row,
} from "antd";
import dayjs from "dayjs";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

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
    const selectedOrganization = useSelector(
        getEmployeeDetailsFormSelectedOrganization,
    );

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
            const keys: string[] = Object.keys(changedValues);

            keys.forEach((key) => {
                switch (key) {
                    case "surname":
                        dispatch(
                            employeeDetailsActions.setFormData({
                                ...employeeDetailsForm,
                                surname: changedValues[key],
                            }),
                        );
                        break;
                    case "name":
                        dispatch(
                            employeeDetailsActions.setFormData({
                                ...employeeDetailsForm,
                                name: changedValues[key],
                            }),
                        );
                        break;
                    case "hireDate":
                        dispatch(
                            employeeDetailsActions.setFormData({
                                ...employeeDetailsForm,
                                hireDate: changedValues[key],
                            }),
                        );
                        break;
                    case "dismissDate":
                        dispatch(
                            employeeDetailsActions.setFormData({
                                ...employeeDetailsForm,
                                dismissDate: changedValues[key],
                            }),
                        );
                        break;
                    case "email":
                        dispatch(
                            employeeDetailsActions.setFormData({
                                ...employeeDetailsForm,
                                email: changedValues[key],
                            }),
                        );
                        break;
                    case "phone":
                        dispatch(
                            employeeDetailsActions.setFormData({
                                ...employeeDetailsForm,
                                phone: changedValues[key],
                            }),
                        );
                        break;
                    case "rank":
                        dispatch(
                            employeeDetailsActions.setFormData({
                                ...employeeDetailsForm,
                                rank: changedValues[key],
                            }),
                        );
                        break;
                }
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

    const onChangeOrganization = useCallback(
        async (value: Organization | undefined) => {
            dispatch(
                employeeDetailsActions.setFormDataSelectedOrganization(value),
            );

            if (value) {
                // Если значение поменялось, меняем значения селекторов
                // Подразделения
                await dispatch(
                    fetchAllDepartments({ organizationId: value.id }),
                );

                // Должности
                await dispatch(fetchAllBerthes({ organizationId: value.id }));
            } else {
                // Сбрасываем значения
                dispatch(
                    employeeDetailsActions.setFormData({
                        ...employeeDetailsForm,
                        department: undefined,
                    }),
                );

                dispatch(
                    employeeDetailsActions.setFormData({
                        ...employeeDetailsForm,
                        berth: undefined,
                    }),
                );

                dispatch(
                    employeeDetailsActions.setFormData({
                        ...employeeDetailsForm,
                        rank: undefined,
                    }),
                );
            }
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
                                size={150}
                                // style={{ backgroundColor: "#87d068" }}
                                file={employeeDetailsForm?.avatar}
                                onChangeAvatar={onChangeAvatar}
                                onDeleteAvatar={onDeleteAvatar}
                            />
                        </Flex>
                    </Col>
                </Row>
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
                <Divider orientation={"left"} orientationMargin={0}>
                    Работа
                </Divider>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item label={"Организация"}>
                            <OrganizationSelector
                                value={selectedOrganization}
                                onValueChanged={onChangeOrganization}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Подразделение"}>
                            <DepartmentSelector
                                disabled={selectedOrganization === undefined}
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
                                disabled={selectedOrganization === undefined}
                                value={employeeDetailsForm?.berth}
                                onValueChanged={onChangeBerth}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Разряд"} name={"rank"}>
                            <Input
                                disabled={selectedOrganization === undefined}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label={"Принят на работу"} name={"hireDate"}>
                    <DatePicker format={"DD.MM.YYYY"} />
                </Form.Item>
            </Form>
        </>
    );
});