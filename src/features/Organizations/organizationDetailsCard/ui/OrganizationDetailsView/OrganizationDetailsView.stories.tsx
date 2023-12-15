import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationDetailsView } from "./OrganizationDetailsView";

const meta = {
    title: ".../OrganizationDetailsView",
    component: OrganizationDetailsView,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationDetailsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
