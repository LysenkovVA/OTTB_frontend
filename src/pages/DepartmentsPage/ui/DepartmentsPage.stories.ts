import type { Meta, StoryObj } from "@storybook/react";

import { DepartmentsPage } from "../index";

const meta = {
    title: "pages/DepartmentsPage",
    component: DepartmentsPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof DepartmentsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
