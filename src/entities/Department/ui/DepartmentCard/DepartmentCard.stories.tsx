import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentCard } from "./DepartmentCard";

const meta = {
    title: "entities/Department/DepartmentCard",
    component: DepartmentCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof DepartmentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        department: {
            id: "1",
            name: "Sales",
            organization: { id: "1", name: "Рога и копыта" },
        },
    },
};
