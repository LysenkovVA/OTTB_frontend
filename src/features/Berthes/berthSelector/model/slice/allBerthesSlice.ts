import { fetchAllBerthes } from "@/features/Berthes/berthSelector/model/services/fetchAllBerthes/fetchAllBerthes";
import { createSlice } from "@reduxjs/toolkit";
import { allBerthesAdapter } from "../adapter/allBerthesAdapter";
import { AllBerthesSchema } from "../types/AllBerthesSchema";

const initialState: AllBerthesSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const allBerthesSlice = createSlice({
    name: "allBerthesSlice",
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
                    allBerthesAdapter.removeAll(state);
                }
            })
            .addCase(fetchAllBerthes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    allBerthesAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    allBerthesAdapter.addMany(state, action.payload.rows);
                }

                state._isInitialized = true;
            })
            .addCase(fetchAllBerthes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: allBerthesActions, reducer: allBerthesReducer } =
    allBerthesSlice;
