import type { Meta, StoryObj } from "@storybook/react";
import { ErrorInfo } from "./ErrorInfo";

const meta = {
    title: "shared/ErrorInfo",
    component: ErrorInfo,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ErrorInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { title: "Title", status: "403", subtitle: "Subtitle" },
};
