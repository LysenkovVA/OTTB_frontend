import type { Meta, StoryObj } from "@storybook/react";
import { EmployeesInfiniteList } from "./EmployeesInfiniteList";

const meta = {
    title: "features/Employees/EmployeesInfiniteList",
    component: EmployeesInfiniteList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeesInfiniteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
