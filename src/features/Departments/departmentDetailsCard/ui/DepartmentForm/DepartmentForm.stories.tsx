import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentForm } from "./DepartmentForm";

const meta = {
    title: "component/DepartmentForm",
    component: DepartmentForm,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof DepartmentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};