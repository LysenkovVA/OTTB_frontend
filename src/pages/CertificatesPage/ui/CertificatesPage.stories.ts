import type { Meta, StoryObj } from "@storybook/react";

import { CertificatesPage } from "../index";

const meta = {
    title: "pages/CertificatesPage",
    component: CertificatesPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CertificatesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
