import type { Meta, StoryObj } from "@storybook/react";
import { EditProfile } from "./EditProfile";

const meta = {
    title: "component/EditProfile",
    component: EditProfile,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EditProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};