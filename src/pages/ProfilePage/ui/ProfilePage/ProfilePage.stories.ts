import type { Meta, StoryObj } from "@storybook/react";

import { StateSchema } from "@/app/providers/StoreProvider";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ProfilePage } from "../../index";

const meta = {
    title: "pages/ProfilePage",
    component: ProfilePage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialState: DeepPartial<StateSchema> = {
    profileSchema: {
        profileData: {
            birthDate: new Date().toDateString(),
            surname: "Ivanov",
            name: "Ivan",
            patronymic: "Ivanovich",
        },
    },
};

export const Primary: Story = {
    args: {},
    decorators: [(S) => StoreDecorator(initialState as StateSchema, S)],
};
