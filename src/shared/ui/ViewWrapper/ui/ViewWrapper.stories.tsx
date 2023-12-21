import type { Meta, StoryObj } from "@storybook/react";
import { ViewWrapper } from "./ViewWrapper";

const meta = {
    title: "component/ViewWrapper",
    component: ViewWrapper,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ViewWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};