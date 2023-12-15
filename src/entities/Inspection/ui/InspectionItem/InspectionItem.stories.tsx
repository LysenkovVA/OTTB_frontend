import { Inspection } from "@/entities/Inspection";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import { InspectionItem } from "./InspectionItem";

const meta = {
    title: "entities/Inspection/InspectionItem",
    component: InspectionItem,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof InspectionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const inspection: Inspection = {
    id: "1",
    date: dayjs("2023-11-19").toDate(),
    isPenalty: true,
    isCommitional: false,
    dateOfElimination: dayjs("2023-10-09").toDate(),
    documentNumber: "6153797590",
    documentDate: dayjs("2023-11-03").toDate(),
    notes: "Какие-то примечания",
    inspectionType: {
        id: "1",
        value: "Плановая",
    },
    constructionObject: {
        id: "10",
        name: "Дорога",
        address: "645 Canal Street",
        startDate: dayjs("2023-09-19").toDate(),
        endDate: dayjs("2023-08-09").toDate(),
    },
    resultDocumentType: {
        id: "2",
        value: "Предписание",
    },
};

export const Primary: Story = {
    args: { inspection },
};
