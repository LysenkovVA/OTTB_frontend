import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationListItem } from "./OrganizationListItem";

const meta = {
    title: "entities/Organization/OrganizationListItem",
    component: OrganizationListItem,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { organization: { id: "1", name: "Рога и копыта" } },
};
