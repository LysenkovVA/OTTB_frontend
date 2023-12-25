import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationDetails } from "./OrganizationDetails";

const meta = {
    title: "component/OrganizationDetails",
    component: OrganizationDetails,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};