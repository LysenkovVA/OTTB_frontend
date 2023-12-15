import type { Meta, StoryObj } from "@storybook/react";
import CreateDepartmentPage from "./CreateDepartmentPage";

const meta = {
    title: ".../CreateDepartmentPage",
    component: CreateDepartmentPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CreateDepartmentPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
