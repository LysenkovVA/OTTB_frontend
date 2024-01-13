import type { Meta, StoryObj } from "@storybook/react";
import { CreateCheckList } from "./CreateCheckList";

const meta = {
    title: "component/CreateCheckList",
    component: CreateCheckList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CreateCheckList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};