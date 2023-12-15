import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCardForm } from "./ProfileCardForm";

const meta = {
    title: "entities/User/ProfileCardForm",
    component: ProfileCardForm,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ProfileCardForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
