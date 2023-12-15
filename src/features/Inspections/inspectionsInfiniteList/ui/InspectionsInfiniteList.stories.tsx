import { StateSchema } from "@/app/providers/StoreProvider";
import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import type { Meta, StoryObj } from "@storybook/react";
import { InspectionsInfiniteList } from "./InspectionsInfiniteList";

const meta = {
    title: "features/Inspections/InspectionsInfiniteList",
    component: InspectionsInfiniteList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof InspectionsInfiniteList>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialState: DeepPartial<StateSchema> = {
    inspectionsInfiniteListSchema: {
        ids: [],
        entities: {},
        limit: 10,
        offset: 0,
        hasMore: false,
        error: "",
        isLoading: false,
        _isInitialized: true,
    },
};

export const NoData: Story = {
    args: {},
    decorators: [
        (S) => RouterDecorator(S),
        (S) => StoreDecorator(initialState as StateSchema, S),
    ],
};

const initialStateIsLoading: DeepPartial<StateSchema> = {
    inspectionsInfiniteListSchema: {
        ids: ["1", "2", "3", "4"],
        entities: {
            1: { id: "1" },
            2: { id: "2" },
            3: { id: "3" },
            4: { id: "4" },
        },
        limit: 3,
        offset: 0,
        hasMore: false,
        error: "",
        isLoading: true,
        _isInitialized: false,
    },
};

export const IsLoading: Story = {
    args: {},
    decorators: [
        (S) => RouterDecorator(S),
        (S) => StoreDecorator(initialStateIsLoading as StateSchema, S),
    ],
};

const initialStateError: DeepPartial<StateSchema> = {
    inspectionsInfiniteListSchema: {
        ids: [],
        entities: {},
        limit: 10,
        offset: 0,
        hasMore: false,
        error: "Ошибка при загрузке данных",
        isLoading: false,
        _isInitialized: false,
    },
};

export const WithError: Story = {
    args: {},
    decorators: [
        (S) => RouterDecorator(S),
        (S) => StoreDecorator(initialStateError as StateSchema, S),
    ],
};
