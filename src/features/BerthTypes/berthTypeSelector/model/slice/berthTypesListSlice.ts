import { BerthType } from "@/entities/BerthType";
import { BerthTypeListSchema } from "@/features/BerthTypes/berthTypeSelector";
import { berthTypesListAdapter } from "@/features/BerthTypes/berthTypeSelector/model/adapter/berthTypesListAdapter";
import { createBerthType } from "@/features/BerthTypes/berthTypeSelector/model/services/createBerthType/createBerthType";
import { deleteBerthType } from "@/features/BerthTypes/berthTypeSelector/model/services/deleteBerthType/deleteBerthType";
import { getBerthTypesList } from "@/features/BerthTypes/berthTypeSelector/model/services/getBerthTypesList/getBerthtypesList";
import { updateBerthType } from "@/features/BerthTypes/berthTypeSelector/model/services/updateBerthType/updateBerthType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: BerthTypeListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const berthTypesListSlice = createSlice({
    name: "berthTypesListSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBerthTypesList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    berthTypesListAdapter.removeAll(state);
                }
            })
            .addCase(getBerthTypesList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    berthTypesListAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    berthTypesListAdapter.addMany(state, action.payload.rows);
                }

                state._isInitialized = true;
            })
            .addCase(getBerthTypesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(
                createBerthType.fulfilled,
                (state, action: PayloadAction<BerthType>) => {
                    berthTypesListAdapter.addOne(state, action.payload);
                },
            )
            .addCase(
                updateBerthType.fulfilled,
                (state, action: PayloadAction<BerthType>) => {
                    berthTypesListAdapter.setOne(state, action.payload);
                },
            )
            .addCase(deleteBerthType.fulfilled, (state, action) => {
                berthTypesListAdapter.removeOne(state, action.meta.arg.id);
            });
    },
});

export const {
    actions: berthTypesListActions,
    reducer: berthTypesListReducer,
} = berthTypesListSlice;
