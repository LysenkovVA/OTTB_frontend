import type { Meta, StoryObj } from "@storybook/react";

import { AppHeaderLogo } from "./AppHeaderLogo";

const meta = {
    title: "widgets/AppHeader/AppHeaderLogo",
    component: AppHeaderLogo,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof AppHeaderLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
