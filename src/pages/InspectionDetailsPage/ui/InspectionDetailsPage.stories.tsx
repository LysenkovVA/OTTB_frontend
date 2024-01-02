import type { Meta, StoryObj } from "@storybook/react";
import InspectionDetailsPage from "./InspectionDetailsPage";

const meta = {
    title: "pages/InspectionDetailsPage",
    component: InspectionDetailsPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof InspectionDetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};