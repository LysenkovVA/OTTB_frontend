import { getUser } from "@/entities/User";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { AppSideMenuItemType } from "@/widgets/AppSideMenu/model/types/AppSideMenuItemType";
import {
    ApartmentOutlined,
    BankOutlined,
    CarryOutOutlined,
    ContactsOutlined,
} from "@ant-design/icons";
import { createSelector } from "@reduxjs/toolkit";

export const getAppSideMenuItems = createSelector(
    getUser,
    (authenticatedUser) => {
        // Список пунктов меню
        const itemsList: AppSideMenuItemType[] = [];

        // Доступные только авторизованному пользователю
        if (authenticatedUser?.id) {
            itemsList.push(
                {
                    path: RoutePath.inspections,
                    text: "Проверки",
                    icon: <CarryOutOutlined />,
                },
                // {
                //     path: RoutePath.certificates,
                //     text: "Удостоверения",
                //     icon: <IdcardOutlined />,
                // },
                {
                    path: RoutePath.objects,
                    text: "Объекты",
                    icon: <BankOutlined />,
                },
                {
                    path: RoutePath.departments,
                    text: "Подразделения",
                    icon: <ApartmentOutlined />,
                },
                {
                    path: RoutePath.employees,
                    text: "Сотрудники",
                    icon: <ContactsOutlined />,
                },
            );
        }

        return itemsList;
    },
);
