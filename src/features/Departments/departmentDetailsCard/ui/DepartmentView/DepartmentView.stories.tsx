import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentView } from "./DepartmentView";

const meta = {
    title: "component/DepartmentView",
    component: DepartmentView,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof DepartmentView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};