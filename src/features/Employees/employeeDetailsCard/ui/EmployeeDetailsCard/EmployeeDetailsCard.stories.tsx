import { StateSchema } from "@/app/providers/StoreProvider";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import type { Meta, StoryObj } from "@storybook/react";
import { EmployeeDetailsCard } from "./EmployeeDetailsCard";

const meta = {
    title: "entities/Employee/EmployeeDetailsCard",
    component: EmployeeDetailsCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeeDetailsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialState: DeepPartial<StateSchema> = {
    employeeDetailsSchema: {
        employeeDetails: {
            id: "1",
            surname: "Ivanov",
            name: "Ivan",
        },
    },
};

export const Primary: Story = {
    args: {},
    decorators: [(S) => StoreDecorator(initialState as StateSchema, S)],
};
