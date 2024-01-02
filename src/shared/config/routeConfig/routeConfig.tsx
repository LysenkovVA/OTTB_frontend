import { CertificatesPage } from "@/pages/CertificatesPage";
import { ConstructionObjectsPage } from "@/pages/ConstructionObjectsPage";
import { CreateCertificatePage } from "@/pages/CreateCertificatePage";
import { CreateConstructionObjectPage } from "@/pages/CreateConstructionObjectPage";
import { CreateDepartmentPage } from "@/pages/CreateDepartmentPage";
import { CreateEmployeePage } from "@/pages/CreateEmployeePage";
import { CreateInspectionPage } from "@/pages/CreateInspectionPage";
import { CreateOrganizationPage } from "@/pages/CreateOrganizationPage";
import { DepartmentsPage } from "@/pages/DepartmentsPage";
import { EmployeeDetailsPage } from "@/pages/EmployeeDetailsPage";
import { EmployeesPage } from "@/pages/EmployeesPage";
import { InspectionDetailsPage } from "@/pages/InspectionDetailsPage";
import { InspectionsPage } from "@/pages/InspectionsPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OrganizationDetailsPage } from "@/pages/OrganizationDetailsPage";
import { OrganizationsPage } from "@/pages/OrganizationsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SignUpPage } from "@/pages/SignUpPage";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
    LOGIN = "login",
    SIGNUP = "signup",
    PROFILE = "profile",
    INSPECTIONS = "inspections",
    CREATE_INSPECTION = "create_inspection",
    INSPECTION_DETAILS = "inspection_details",
    CERTIFICATES = "certificates",
    CREATE_CERTIFICATE = "create_certificate",
    ORGANIZATIONS = "organizations",
    CREATE_ORGANIZATION = "create_organization",
    ORGANIZATION_DETAILS = "organization_details",
    CONSTRUCTION_OBJECTS = "objects",
    CREATE_CONSTRUCTION_OBJECT = "create_object",
    DEPARTMENTS = "departments",
    CREATE_DEPARTMENT = "create_department",
    EMPLOYEES = "employees",
    EMPLOYEE_DETAILS = "employee_details",
    CREATE_EMPLOYEE = "create_employee",

    // Несуществующий маршрут - последний!
    NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: "/",
    [AppRoutes.SIGNUP]: "/signup",
    [AppRoutes.PROFILE]: "/profile/", // +id

    [AppRoutes.INSPECTIONS]: "/inspections",
    [AppRoutes.CREATE_INSPECTION]: "/inspections/create",
    [AppRoutes.INSPECTION_DETAILS]: "/inspections/",

    [AppRoutes.CERTIFICATES]: "/certificates",
    [AppRoutes.CREATE_CERTIFICATE]: "/certificates/create",

    [AppRoutes.ORGANIZATIONS]: "/organizations",
    [AppRoutes.CREATE_ORGANIZATION]: "/organizations/create",
    [AppRoutes.ORGANIZATION_DETAILS]: "/organizations/", // +id

    [AppRoutes.CONSTRUCTION_OBJECTS]: "/objects",
    [AppRoutes.CREATE_CONSTRUCTION_OBJECT]: "/objects/create",

    [AppRoutes.DEPARTMENTS]: "/departments",
    [AppRoutes.CREATE_DEPARTMENT]: "/departments/create",

    [AppRoutes.EMPLOYEES]: "/employees",
    [AppRoutes.EMPLOYEE_DETAILS]: "/employees/", // +id
    [AppRoutes.CREATE_EMPLOYEE]: "/employees/create",

    [AppRoutes.NOT_FOUND]: "*",
};

export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.SIGNUP]: {
        path: RoutePath.signup,
        element: <SignUpPage />,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.INSPECTIONS]: {
        path: RoutePath.inspections,
        element: <InspectionsPage />,
        authOnly: true,
    },
    // Детали проверки
    [AppRoutes.CREATE_INSPECTION]: {
        path: RoutePath.create_inspection,
        element: <CreateInspectionPage />,
        authOnly: true,
    },
    [AppRoutes.INSPECTION_DETAILS]: {
        path: `${RoutePath.inspection_details}:id`,
        element: <InspectionDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.CERTIFICATES]: {
        path: RoutePath.certificates,
        element: <CertificatesPage />,
        authOnly: true,
    },
    [AppRoutes.CREATE_CERTIFICATE]: {
        path: RoutePath.create_certificate,
        element: <CreateCertificatePage />,
        authOnly: true,
    },
    [AppRoutes.ORGANIZATIONS]: {
        path: RoutePath.organizations,
        element: <OrganizationsPage />,
        authOnly: true,
    },
    [AppRoutes.CREATE_ORGANIZATION]: {
        path: RoutePath.create_organization,
        element: <CreateOrganizationPage />,
        authOnly: true,
    },
    [AppRoutes.ORGANIZATION_DETAILS]: {
        path: `${RoutePath.organization_details}:id`,
        element: <OrganizationDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.CONSTRUCTION_OBJECTS]: {
        path: RoutePath.objects,
        element: <ConstructionObjectsPage />,
        authOnly: true,
    },
    [AppRoutes.CREATE_CONSTRUCTION_OBJECT]: {
        path: RoutePath.create_object,
        element: <CreateConstructionObjectPage />,
        authOnly: true,
    },
    [AppRoutes.DEPARTMENTS]: {
        path: RoutePath.departments,
        element: <DepartmentsPage />,
        authOnly: true,
    },
    [AppRoutes.CREATE_DEPARTMENT]: {
        path: RoutePath.create_department,
        element: <CreateDepartmentPage />,
        authOnly: true,
    },
    [AppRoutes.EMPLOYEES]: {
        path: RoutePath.employees,
        element: <EmployeesPage />,
        authOnly: true,
    },
    [AppRoutes.EMPLOYEE_DETAILS]: {
        path: `${RoutePath.employee_details}:id`,
        element: <EmployeeDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.CREATE_EMPLOYEE]: {
        path: RoutePath.create_employee,
        element: <CreateEmployeePage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
