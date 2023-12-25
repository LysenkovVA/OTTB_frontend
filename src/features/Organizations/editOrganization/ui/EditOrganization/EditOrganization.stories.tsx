import type { Meta, StoryObj } from "@storybook/react";
import { EditOrganization } from "./EditOrganization";

const meta = {
    title: "component/EditOrganization",
    component: EditOrganization,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EditOrganization>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};