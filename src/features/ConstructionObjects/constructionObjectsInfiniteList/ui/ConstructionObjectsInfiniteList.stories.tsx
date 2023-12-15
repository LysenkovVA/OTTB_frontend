import type { Meta, StoryObj } from "@storybook/react";
import { ConstructionObjectsInfiniteList } from "./ConstructionObjectsInfiniteList";

const meta = {
    title: "features/ConstructionObjects/ConstructionObjectsInfiniteList",
    component: ConstructionObjectsInfiniteList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ConstructionObjectsInfiniteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
