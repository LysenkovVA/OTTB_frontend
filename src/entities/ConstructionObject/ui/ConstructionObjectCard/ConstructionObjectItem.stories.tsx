import { ConstructionObject } from "@/entities/ConstructionObject";
import type { Meta, StoryObj } from "@storybook/react";
import { ConstructionObjectItem } from "./ConstructionObjectItem";

const meta = {
    title: "entities/ConstructionObject/ConstructionObjectItem",
    component: ConstructionObjectItem,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ConstructionObjectItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const constructionObject: ConstructionObject = {
    id: "1",
    name: "Туннель",
    address: "Москва, ул. Яблочкина, д.25",
    startDate: new Date(),
    endDate: new Date(),
    workspace: { id: "1", name: "ООО 'ССТ-М'" },
};

export const Primary: Story = {
    args: { constructionObject },
};
