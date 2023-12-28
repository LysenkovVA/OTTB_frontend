import EmployeeItem from "@/features/Employees/employeesInfiniteList/ui/EmployeeItem/EmployeeItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "entities/Employee/EmployeeItem",
    component: EmployeeItem,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeeItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        employee: {
            id: "1",
            surname: "Иванов",
            name: "Иван",
            hireDate: Date.now().toLocaleString(),
            dismissDate: Date.now().toLocaleString(),
            rank: "1",
            department: {
                id: "1",
                name: "Участок 1",
                organization: {
                    id: "1",
                    name: "ООО ССТ-М",
                },
            },
            berth: {
                id: "1",
                value: "Электрик",
                hasRank: false,
                berthType: {
                    id: "1",
                    value: "Рабочий",
                },
            },
        },
    },
};
