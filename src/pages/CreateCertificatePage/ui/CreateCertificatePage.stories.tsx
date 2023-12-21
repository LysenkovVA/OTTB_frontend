import type { Meta, StoryObj } from "@storybook/react";
import CreateCertificatePage from "./CreateCertificatePage";

const meta = {
    title: "pages/CreateCertificatePage",
    component: CreateCertificatePage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CreateCertificatePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};