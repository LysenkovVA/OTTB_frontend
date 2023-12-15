import type { Meta, StoryObj } from "@storybook/react";
import CreateEmployeePage from "./CreateEmployeePage";

const meta = {
    title: ".../CreateEmployeePage",
    component: CreateEmployeePage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CreateEmployeePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
