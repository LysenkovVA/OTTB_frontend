import type { Meta, StoryObj } from "@storybook/react";
import { ProfileDetails } from "./ProfileDetails";

const meta = {
    title: "component/ProfileDetails",
    component: ProfileDetails,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ProfileDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};