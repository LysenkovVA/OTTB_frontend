import type { Meta, StoryObj } from "@storybook/react";
import { EditEmployee } from "./EditEmployee";

const meta = {
    title: "component/EditEmployee",
    component: EditEmployee,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EditEmployee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};