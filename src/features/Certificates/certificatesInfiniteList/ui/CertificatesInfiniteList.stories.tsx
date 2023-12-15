import type { Meta, StoryObj } from "@storybook/react";
import { CertificatesInfiniteList } from "./CertificatesInfiniteList";

const meta = {
    title: "features/Certificates/CertificatesInfiniteList",
    component: CertificatesInfiniteList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CertificatesInfiniteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
