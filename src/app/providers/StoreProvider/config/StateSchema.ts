// Схема данных приложения
import { EmployeeDetailsSchema } from "@/entities/Employee";
import { OrganizationDetailsSchema } from "@/entities/Organization";
import { ProfileSchema } from "@/entities/Profile";
import { UserSchema } from "@/entities/User/model/types/UserSchema";
import { AllBerthesSchema } from "@/features/Berthes/berthSelector";
import { DepartmentDetailsSchema } from "@/features/Departments/departmentDetailsCard";
import { AllDepartmentsSchema } from "@/features/Departments/departmentSelector";
import { AllOrganizationsSchema } from "@/features/Organizations/organizationSelector";
import { OrganizationsInfiniteListSchema } from "@/features/Organizations/organizationsInfiniteList/model/types/OrganizationsInfiniteListSchema";
import { UISchema } from "@/features/UI";
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
    // ГЛАВНЫЕ СТРАНИЦЫ
    inspectionsInfiniteListSchema?: InspectionsInfiniteListSchema;
    certificatesInfiniteListSchema?: CertificatesInfiniteListSchema;
    organizationsInfiniteListSchema?: OrganizationsInfiniteListSchema;
    constructionObjectsInfiniteListSchema?: ConstructionObjectsInfiniteListSchema;
    departmentsInfiniteListSchema?: DepartmentsInfiniteListSchema;
    employeesInfiniteListSchema?: EmployeesInfiniteListSchema;
    // ДЕТАЛИ РАБОТНИКА
    employeeDetailsSchema?: EmployeeDetailsSchema;
    departmentDetailsSchema?: DepartmentDetailsSchema;
    allBerthesSchema?: AllBerthesSchema;
    allOrganizationsSchema?: AllOrganizationsSchema;
    allDepartmentsSchema?: AllDepartmentsSchema;
    organizationDetailsSchema?: OrganizationDetailsSchema;
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
