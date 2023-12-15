import { fetchConstructionObjectsInfiniteList } from "@/features/ConstructionObjects/constructionObjectsInfiniteList/model/services/fetchConstructionObjectsInfiniteList/fetchConstructionObjectsInfiniteList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { constructionObjectsInfiniteListAdapter } from "../adapter/constructionObjectsInfiniteListAdapter";
import { ConstructionObjectsInfiniteListSchema } from "../types/ConstructionObjectsInfiniteListSchema";

const initialState: ConstructionObjectsInfiniteListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const constructionObjectsInfiniteListSlice = createSlice({
    name: "constructionObjectsInfiniteListSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchConstructionObjectsInfiniteList.pending,
                (state, action) => {
                    state.isLoading = true;
                    state.error = undefined;

                    // Если данные заменяются
                    if (action.meta.arg.replaceData) {
                        // Очищаем старые
                        constructionObjectsInfiniteListAdapter.removeAll(state);
                    }
                },
            )
            .addCase(
                fetchConstructionObjectsInfiniteList.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.error = undefined;

                    // Если данные заменяются
                    if (action.meta.arg.replaceData) {
                        // Записываем новые данные
                        constructionObjectsInfiniteListAdapter.setAll(
                            state,
                            action.payload.rows,
                        );
                    } else {
                        // Добавляем порцию данных
                        constructionObjectsInfiniteListAdapter.addMany(
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
                fetchConstructionObjectsInfiniteList.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const {
    actions: constructionObjectsInfiniteListActions,
    reducer: constructionObjectsInfiniteListReducer,
} = constructionObjectsInfiniteListSlice;
