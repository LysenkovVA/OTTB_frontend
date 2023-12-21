import type { Meta, StoryObj } from "@storybook/react";
import { ListWrapper } from "./ListWrapper";

const meta = {
    title: "shared/ListWrapper",
    component: ListWrapper,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ListWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
