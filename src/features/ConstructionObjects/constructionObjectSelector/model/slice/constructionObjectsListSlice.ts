import { ConstructionObject } from "@/entities/ConstructionObject";
import { createConstructionObject } from "@/features/ConstructionObjects/constructionObjectSelector/model/services/createConstructionObject/createConstructionObject";
import { deleteConstructionObject } from "@/features/ConstructionObjects/constructionObjectSelector/model/services/deleteConstructionObject/deleteConstructionObject";
import { fetchAllConstructionObjects } from "@/features/ConstructionObjects/constructionObjectSelector/model/services/fetchAllConstructionObjects/fetchAllConstructionObjects";
import { updateConstructionObject } from "@/features/ConstructionObjects/constructionObjectSelector/model/services/updateConstructionObject/updateConstructionObject";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { constructionObjectsListAdapter } from "../adapter/constructionObjectsListAdapter";
import { ConstructionObjectsListSchema } from "../types/ConstructionObjectsListSchema";

const initialState: ConstructionObjectsListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const constructionObjectsListSlice = createSlice({
    name: "constructionObjectsListSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllConstructionObjects.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    constructionObjectsListAdapter.removeAll(state);
                }
            })
            .addCase(fetchAllConstructionObjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    constructionObjectsListAdapter.setAll(
                        state,
                        action.payload.rows,
                    );
                } else {
                    // Добавляем порцию данных
                    constructionObjectsListAdapter.addMany(
                        state,
                        action.payload.rows,
                    );
                }

                state._isInitialized = true;
            })
            .addCase(fetchAllConstructionObjects.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    constructionObjectsListAdapter.removeAll(state);
                }
            })
            .addCase(
                createConstructionObject.fulfilled,
                (state, action: PayloadAction<ConstructionObject>) => {
                    constructionObjectsListAdapter.addOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(
                updateConstructionObject.fulfilled,
                (state, action: PayloadAction<ConstructionObject>) => {
                    constructionObjectsListAdapter.setOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(deleteConstructionObject.fulfilled, (state, action) => {
                constructionObjectsListAdapter.removeOne(
                    state,
                    action.meta.arg.id,
                );
            });
    },
});

export const {
    actions: constructionObjectsListActions,
    reducer: constructionObjectsListReducer,
} = constructionObjectsListSlice;
