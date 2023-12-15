import type { Meta, StoryObj } from "@storybook/react";

import { StateSchema } from "@/app/providers/StoreProvider";
import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { AppSideMenu } from "./AppSideMenu";

const meta = {
    title: "widgets/AppSideMenu",
    component: AppSideMenu,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof AppSideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialState: DeepPartial<StateSchema> = {
    userSchema: {
        authenticatedUser: {
            id: "1",
            email: "sb@mail.ru",
            // token: "TOKEN",
        },
    },
};

export const Primary: Story = {
    args: {},
    decorators: [
        (S) => RouterDecorator(S),
        (S) => StoreDecorator(initialState as StateSchema, S),
    ],
};
