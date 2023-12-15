import { fetchInspectionsInfiniteList } from "@/features/Inspections/inspectionsInfiniteList/model/services/fetchInspectionsInfiniteList/fetchInspectionsInfiniteList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { inspectionsInfiniteListAdapter } from "../adapter/inspectionsInfiniteListAdapter";
import { InspectionsInfiniteListSchema } from "../types/InspectionsInfiniteListSchema";

const initialState: InspectionsInfiniteListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const inspectionsInfiniteListSlice = createSlice({
    name: "inspectionsInfiniteListSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInspectionsInfiniteList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    inspectionsInfiniteListAdapter.removeAll(state);
                }
            })
            .addCase(
                fetchInspectionsInfiniteList.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.error = undefined;

                    // Если данные заменяются
                    if (action.meta.arg.replaceData) {
                        // Записываем новые данные
                        inspectionsInfiniteListAdapter.setAll(
                            state,
                            action.payload.rows,
                        );
                    } else {
                        // Добавляем порцию данных
                        inspectionsInfiniteListAdapter.addMany(
                            state,
                            action.payload.rows,
                        );
                    }

                    state._isInitialized = true;
                    // Есть ли еще данные
                    state.hasMore = action.payload.count > state.ids.length;
                },
            )
            .addCase(fetchInspectionsInfiniteList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: inspectionsInfiniteListActions,
    reducer: inspectionsInfiniteListReducer,
} = inspectionsInfiniteListSlice;
