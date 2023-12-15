import { Organization } from "@/entities/Organization";
import { fetchOrganizationsInfiniteList } from "@/features/Organizations/organizationsInfiniteList/model/services/fetchOrganizationsInfiniteList/fetchOrganizationsInfiniteList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { organizationsInfiniteListAdapter } from "../adapter/organizationsInfiniteListAdapter";
import { OrganizationsInfiniteListSchema } from "../types/OrganizationsInfiniteListSchema";

const initialState: OrganizationsInfiniteListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const organizationsInfiniteListSlice = createSlice({
    name: "organizationsInfiniteListSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        addOne: (state, action: PayloadAction<Organization>) => {
            organizationsInfiniteListAdapter.addOne(state, action.payload);
        },
        setOne: (state, action: PayloadAction<Organization>) => {
            organizationsInfiniteListAdapter.setOne(state, action.payload);
        },
        removeOne: (state, action: PayloadAction<string>) => {
            organizationsInfiniteListAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchOrganizationsInfiniteList.pending,
                (state, action) => {
                    state.isLoading = true;
                    state.error = undefined;

                    // Если данные заменяются
                    if (action.meta.arg.replaceData) {
                        // Очищаем старые
                        organizationsInfiniteListAdapter.removeAll(state);
                    }
                },
            )
            .addCase(
                fetchOrganizationsInfiniteList.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.error = undefined;

                    // Если данные заменяются
                    if (action.meta.arg.replaceData) {
                        // Записываем новые данные
                        organizationsInfiniteListAdapter.setAll(
                            state,
                            action.payload.rows,
                        );
                    } else {
                        // Добавляем порцию данных
                        organizationsInfiniteListAdapter.addMany(
                            state,
                            action.payload.rows,
                        );
                    }

                    state._isInitialized = true;
                    // Есть ли еще данные
                    state.hasMore = action.payload.count > state.ids.length;
                },
            )
            .addCase(
                fetchOrganizationsInfiniteList.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const {
    actions: organizationsInfiniteListActions,
    reducer: organizationsInfiniteListReducer,
} = organizationsInfiniteListSlice;
