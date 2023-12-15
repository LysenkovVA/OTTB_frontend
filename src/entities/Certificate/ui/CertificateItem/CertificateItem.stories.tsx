import { Certificate } from "@/entities/Certificate/model/types/Certificate";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import { CertificateItem } from "./CertificateItem";

const meta = {
    title: "entities/Certificate/CertificateItem",
    component: CertificateItem,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof CertificateItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const certificate: Certificate = {
    id: "1",
    number: "123456",
    startDate: dayjs("10.03.2023", "DD.MM.YYYY").toDate(),
    group: "3",
    certificateType: {
        id: "1",
        value: "Охрана труда",
        hasGroups: true,
    },
    scans: [],
    protocols: [],
};

export const Primary: Story = {
    args: { certificate },
};
