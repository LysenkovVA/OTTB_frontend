import type { Meta, StoryObj } from "@storybook/react";
import { WorkspaceView } from "./WorkspaceView";

const meta = {
    title: "component/WorkspaceView",
    component: WorkspaceView,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof WorkspaceView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
