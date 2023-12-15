import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationItem } from "./OrganizationItem";

const meta = {
    title: "entities/Organization/OrganizationItem",
    component: OrganizationItem,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { organization: { id: "1", name: "Рога и копыта" } },
};
