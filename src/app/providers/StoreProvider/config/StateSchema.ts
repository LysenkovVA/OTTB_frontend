// Схема данных приложения
import { BerthDetailsSchema } from "@/entities/Berth";
import { BerthTypeDetailsSchema } from "@/entities/BerthType/model/types/BerthTypeDetailsSchema";
import { CertificateDetailsSchema } from "@/entities/Certificate";
import { CertificateTypeDetailsSchema } from "@/entities/CertificateType";
import { CheckListDetailsSchema } from "@/entities/CheckList";
import { ConstructionObjectDetailsSchema } from "@/entities/ConstructionObject";
import { EmployeeDetailsSchema } from "@/entities/Employee";
import { InspectionDetailsSchema } from "@/entities/Inspection/model/types/InspectionDetailsSchema";
import { InspectionTypeDetailsSchema } from "@/entities/InspectionType";
import { ProfileSchema } from "@/entities/Profile";
import { UserSchema } from "@/entities/User/model/types/UserSchema";
import { WorkspaceDetailsSchema } from "@/entities/Workspace";
import { BerthTypeListSchema } from "@/features/BerthTypes/berthTypeSelector";
import { BerthesListSchema } from "@/features/Berthes/berthSelector";
import { CertificateTypeListSchema } from "@/features/CertificateTypes/certificateTypeSelector";
import { ConstructionObjectsListSchema } from "@/features/ConstructionObjects/constructionObjectSelector";
import { DepartmentDetailsSchema } from "@/features/Departments/departmentDetailsCard";
import { AllDepartmentsSchema } from "@/features/Departments/departmentSelector";
import { InspectionTypeSelectorSchema } from "@/features/InspectionTypes/inspectionTypeSelector";
import { UISchema } from "@/features/UI";
import { AllWorkspacesSchema } from "@/features/Workspaces/workspaceSelector";
import { AuthSchema } from "@/features/auth";
import { LogoutSchema } from "@/features/logout/model/types/LogoutSchema";
import { SignUpSchema } from "@/features/signUp/model/types/SignUpSchema";
import {
    AnyAction,
    CombinedState,
    Reducer,
    ReducersMapObject,
} from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { AxiosInstance } from "axios";
import { CertificatesInfiniteListSchema } from "src/features/Certificates/certificatesInfiniteList";
import { ConstructionObjectsInfiniteListSchema } from "src/features/ConstructionObjects/constructionObjectsInfiniteList";
import { DepartmentsInfiniteListSchema } from "src/features/Departments/departmentsInfiniteList";
import { EmployeesInfiniteListSchema } from "src/features/Employees/employeesInfiniteList";
import { InspectionsInfiniteListSchema } from "src/features/Inspections/inspectionsInfiniteList";

export interface StateSchema {
    /**
     * ПОСТОЯННЫЕ РЕДЮСЕРЫ
     */
    userSchema: UserSchema;
    ui: UISchema;

    /**
     * АСИНХРОННЫЕ РЕДЮСЕРЫ
     */
    // ПОЛЬЗОВАТЕЛЬ
    authSchema?: AuthSchema;
    logoutSchema?: LogoutSchema;
    signUpSchema?: SignUpSchema;

    // ПРОФИЛЬ
    profileSchema?: ProfileSchema;

    // РАБОЧЕЕ ПРОСТРАНСТВО
    workspaceDetailsSchema?: WorkspaceDetailsSchema;
    allWorkspacesSchema?: AllWorkspacesSchema;

    // ПРОВЕРКИ
    inspectionsInfiniteListSchema?: InspectionsInfiniteListSchema;
    inspectionDetailsSchema?: InspectionDetailsSchema;
    // ТИПЫ ПРОВЕРОК
    inspectionTypeDetailsSchema?: InspectionTypeDetailsSchema;
    inspectionTypeSelectorSchema?: InspectionTypeSelectorSchema;

    // УДОСТОВЕРЕНИЯ
    certificateDetailsSchema?: CertificateDetailsSchema;
    certificatesInfiniteListSchema?: CertificatesInfiniteListSchema;
    // ТИПЫ УДОСТОВЕРЕНИЙ
    certificateTypeDetailsSchema?: CertificateTypeDetailsSchema;
    certificateTypesListSchema?: CertificateTypeListSchema;

    // ОБЪЕКТЫ
    constructionObjectDetailsSchema?: ConstructionObjectDetailsSchema;
    constructionObjectSelectorSchema?: ConstructionObjectsListSchema;
    constructionObjectsInfiniteListSchema?: ConstructionObjectsInfiniteListSchema;

    // ПОДРАЗДЕЛЕНИЯ
    departmentDetailsSchema?: DepartmentDetailsSchema;
    allDepartmentsSchema?: AllDepartmentsSchema;
    departmentsInfiniteListSchema?: DepartmentsInfiniteListSchema;

    // СОТРУДНИКИ
    employeeDetailsSchema?: EmployeeDetailsSchema;
    employeesInfiniteListSchema?: EmployeesInfiniteListSchema;

    // ДОЛЖНОСТИ
    berthDetailsSchema?: BerthDetailsSchema;
    allBerthesSchema?: BerthesListSchema;

    // ТИПЫ ДОЛЖНОСТЕЙ
    berthTypeDetailsSchema?: BerthTypeDetailsSchema;
    berthTypesListSchema?: BerthTypeListSchema;

    // ЧЕК-ЛИСТЫ
    checkListDetailsSchema?: CheckListDetailsSchema;
}

// Для автокоплита
export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

// Тип для стора с менеджером
export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    // Переопределяем стандартные типы конфига
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
