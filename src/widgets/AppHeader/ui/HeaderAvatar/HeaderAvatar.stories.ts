import type { Meta, StoryObj } from "@storybook/react";

import { StateSchema } from "@/app/providers/StoreProvider";
import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { HeaderAvatar } from "../HeaderAvatar/HeaderAvatar";

const meta = {
    title: "widgets/AppHeader/HeaderAvatar",
    component: HeaderAvatar,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof HeaderAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialState: DeepPartial<StateSchema> = {
    userSchema: {
        authenticatedUser: {
            id: "1",
            email: "sb@mail.ru",
            profile: {
                id: "1",
                surname: "Lysenkov",
                name: "Viktor",
                avatar: {
                    id: "1",
                    name: "file.jpg",
                    path: "",
                    format: "image/jpeg",
                },
            },
        },
    },
};

export const Primary: Story = {
    args: {},
    decorators: [
        (S) => StoreDecorator(initialState as StateSchema, S),
        (S) => RouterDecorator(S),
    ],
};
