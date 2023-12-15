import type { Meta, StoryObj } from "@storybook/react";
import OrganizationsPage from "./OrganizationsPage";

const meta = {
    title: "pages/OrganizationsPage",
    component: OrganizationsPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
