import type { Meta, StoryObj } from "@storybook/react";

import { StateSchema } from "@/app/providers/StoreProvider";
import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { EmployeesPage } from "../../index";

const meta = {
    title: "pages/EmployeesPage",
    component: EmployeesPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const schema: DeepPartial<StateSchema> = {
    employeesInfiniteListSchema: {
        ids: ["1", "2"],
        entities: {
            1: { id: "1", surname: "Ivanov", name: "Ivan" },
            2: { id: "2", surname: "Petrov", name: "Petr" },
        },
        limit: 10,
        offset: 0,
        hasMore: false,
        _isInitialized: true,
    },
};

export const Primary: Story = {
    args: {},
    decorators: [
        (S) => RouterDecorator(S),
        (S) => StoreDecorator(schema as StateSchema, S),
    ],
};
