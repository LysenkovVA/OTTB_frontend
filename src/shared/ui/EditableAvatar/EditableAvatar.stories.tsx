import type { Meta, StoryObj } from "@storybook/react";
import { EditableAvatar } from "./EditableAvatar";

const meta = {
    title: "shared/EditableAvatar",
    component: EditableAvatar,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EditableAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { file: {} },
};
