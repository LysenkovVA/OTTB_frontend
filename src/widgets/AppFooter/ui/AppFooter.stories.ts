import type { Meta, StoryObj } from "@storybook/react";

import { AppFooter } from "./AppFooter";

const meta = {
    title: "widgets/AppFooter",
    component: AppFooter,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof AppFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
