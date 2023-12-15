import type { Meta, StoryObj } from "@storybook/react";
import CreateConstructionObjectPage from "./CreateConstructionObjectPage";

const meta = {
    title: ".../CreateConstructionObjectPage",
    component: CreateConstructionObjectPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CreateConstructionObjectPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
