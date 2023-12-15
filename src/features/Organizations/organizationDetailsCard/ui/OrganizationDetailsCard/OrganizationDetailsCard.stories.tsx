import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationDetailsCard } from "./OrganizationDetailsCard";

const meta = {
    title: ".../OrganizationDetailsCard",
    component: OrganizationDetailsCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationDetailsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
