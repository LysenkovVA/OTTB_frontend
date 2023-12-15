import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationDetailsForm } from "./OrganizationDetailsForm";

const meta = {
    title: ".../OrganizationDetailsForm",
    component: OrganizationDetailsForm,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationDetailsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { onSave: () => {}, onCancel: () => {} },
};
