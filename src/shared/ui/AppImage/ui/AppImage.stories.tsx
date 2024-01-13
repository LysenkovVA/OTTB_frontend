import type { Meta, StoryObj } from "@storybook/react";
import { AppImage } from "./AppImage";

const meta = {
    title: "component/AppImage",
    component: AppImage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof AppImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};