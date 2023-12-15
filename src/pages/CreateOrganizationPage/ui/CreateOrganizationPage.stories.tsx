import type { Meta, StoryObj } from "@storybook/react";
import CreateOrganizationPage from "./CreateOrganizationPage";

const meta = {
    title: ".../CreateOrganizationPage",
    component: CreateOrganizationPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CreateOrganizationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
