import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationsInfiniteList } from "./OrganizationsInfiniteList";

const meta = {
    title: "features/Organizations/OrganizationsInfiniteList",
    component: OrganizationsInfiniteList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationsInfiniteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
