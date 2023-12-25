import type { Meta, StoryObj } from "@storybook/react";
import { EmployeeDetails } from "./EmployeeDetails";

const meta = {
    title: "component/EmployeeDetails",
    component: EmployeeDetails,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeeDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};