import { Berth } from "@/entities/Berth";
import { createBerth } from "@/features/Berthes/berthSelector/model/services/createBerth/createBerth";
import { deleteBerth } from "@/features/Berthes/berthSelector/model/services/deleteBerth/deleteBerth";
import { updateBerth } from "@/features/Berthes/berthSelector/model/services/updateBerth/updateBerth";
import { updateBerthType } from "@/features/BerthTypes/berthTypeSelector/model/services/updateBerthType/updateBerthType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { berthesListAdapter } from "../adapter/berthesListAdapter";
import { fetchAllBerthes } from "../services/fetchAllBerthes/fetchAllBerthes";
import { BerthesListSchema } from "../types/BerthesListSchema";

const initialState: BerthesListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const BerthesListSlice = createSlice({
    name: "BerthesListSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBerthes.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    berthesListAdapter.removeAll(state);
                }
            })
            .addCase(fetchAllBerthes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    berthesListAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    berthesListAdapter.addMany(state, action.payload.rows);
                }

                state._isInitialized = true;
            })
            .addCase(fetchAllBerthes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    berthesListAdapter.removeAll(state);
                }
            })
            .addCase(
                createBerth.fulfilled,
                (state, action: PayloadAction<Berth>) => {
                    berthesListAdapter.addOne(state, action.payload);
                },
            )
            .addCase(
                updateBerth.fulfilled,
                (state, action: PayloadAction<Berth>) => {
                    berthesListAdapter.setOne(state, action.payload);
                },
            )
            .addCase(deleteBerth.fulfilled, (state, action) => {
                berthesListAdapter.removeOne(state, action.meta.arg.berthId);
            })
            .addCase(updateBerthType.fulfilled, (state, action) => {
                const berthes = berthesListAdapter
                    .getSelectors()
                    .selectAll(state)
                    .filter(
                        (berth) => berth.berthType?.id === action.meta.arg.id,
                    );

                // Обновляем значение
                berthes.forEach((berth) => {
                    berthesListAdapter.setOne(state, {
                        ...berth,
                        berthType: action.payload,
                    });
                });
            });
    },
});

export const { actions: BerthesListActions, reducer: BerthesListReducer } =
    BerthesListSlice;
