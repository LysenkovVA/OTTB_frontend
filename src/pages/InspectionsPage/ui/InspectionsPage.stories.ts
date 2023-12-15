import type { Meta, StoryObj } from "@storybook/react";

import { InspectionsPage } from "../index";

const meta = {
    title: "pages/InspectionsPage",
    component: InspectionsPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof InspectionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
