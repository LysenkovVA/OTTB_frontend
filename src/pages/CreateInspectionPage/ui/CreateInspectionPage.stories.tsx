import type { Meta, StoryObj } from "@storybook/react";
import CreateInspectionPage from "./CreateInspectionPage";

const meta = {
    title: ".../CreateInspectionPage",
    component: CreateInspectionPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CreateInspectionPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
