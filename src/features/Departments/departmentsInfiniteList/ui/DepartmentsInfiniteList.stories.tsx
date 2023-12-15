import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentsInfiniteList } from "./DepartmentsInfiniteList";

const meta = {
    title: "features/Departments/DepartmentsInfiniteList",
    component: DepartmentsInfiniteList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof DepartmentsInfiniteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
