import { Inspection } from "@/entities/Inspection";
import { createInspection } from "@/features/Inspections/inspectionsInfiniteList/model/services/createInspection/createInspection";
import { fetchInspectionsInfiniteList } from "@/features/Inspections/inspectionsInfiniteList/model/services/fetchInspectionsInfiniteList/fetchInspectionsInfiniteList";
import { removeInspection } from "@/features/Inspections/inspectionsInfiniteList/model/services/removeInspection/removeInspection";
import { updateInspection } from "@/features/Inspections/inspectionsInfiniteList/model/services/updateInspection/updateInspection";
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
            })
            .addCase(
                createInspection.fulfilled,
                (state, action: PayloadAction<Inspection>) => {
                    inspectionsInfiniteListAdapter.addOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(
                updateInspection.fulfilled,
                (state, action: PayloadAction<Inspection>) => {
                    inspectionsInfiniteListAdapter.setOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(removeInspection.fulfilled, (state, action) => {
                inspectionsInfiniteListAdapter.removeOne(
                    state,
                    action.meta.arg.id,
                );
            });
    },
});

export const {
    actions: inspectionsInfiniteListActions,
    reducer: inspectionsInfiniteListReducer,
} = inspectionsInfiniteListSlice;
