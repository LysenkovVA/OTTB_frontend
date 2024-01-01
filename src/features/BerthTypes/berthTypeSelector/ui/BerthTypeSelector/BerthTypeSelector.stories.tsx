import type { Meta, StoryObj } from "@storybook/react";
import { BerthTypeSelector } from "./BerthTypeSelector";

const meta = {
    title: "component/CertificateTypeSelector",
    component: BerthTypeSelector,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof BerthTypeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
