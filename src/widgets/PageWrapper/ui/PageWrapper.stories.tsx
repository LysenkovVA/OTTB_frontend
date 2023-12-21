import type { Meta, StoryObj } from "@storybook/react";
import { PageWrapper } from "./PageWrapper";

const meta = {
    title: "component/PageWrapper",
    component: PageWrapper,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof PageWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};