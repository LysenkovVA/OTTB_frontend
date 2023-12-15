import type { Meta, StoryObj } from "@storybook/react";

import { ConstructionObjectsPage } from "../index";

const meta = {
    title: "pages/ConstructionObjectsPage",
    component: ConstructionObjectsPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ConstructionObjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
