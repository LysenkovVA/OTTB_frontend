import { getUser } from "@/entities/User";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { MenuItem } from "@/widgets/AppMenu/model/types/AppMenuItemType";
import { createSelector } from "@reduxjs/toolkit";

export const getMenuItems = createSelector(getUser, (user) => {
    const items: MenuItem[] = [];

    // Пользователь авторизован
    if (user?.id) {
        items.push(
            {
                label: <a href={RoutePath.inspections}>Проверки</a>,
                key: 1,
                icon: null,
            },
            {
                label: <a href={RoutePath.objects}>Объекты</a>,
                key: 2,
                icon: null,
            },
            {
                label: <a href={RoutePath.departments}>Подразделения</a>,
                key: 3,
                icon: null,
            },
            {
                label: <a href={RoutePath.employees}>Сотрудники</a>,
                key: 4,
                icon: null,
            },
        );

        return items;
    }
});
