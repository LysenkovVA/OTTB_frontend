import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationSimpleForm } from "./OrganizationSimpleForm";

const meta = {
    title: "component/OrganizationSimpleForm",
    component: OrganizationSimpleForm,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationSimpleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};