import {
    createWorkspace,
    deleteWorkspace,
    updateWorkspace,
    Workspace,
} from "@/entities/Workspace";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allWorkspacesAdapter } from "../adapter/allWorkspacesAdapter";
import { fetchAllWorkspaces } from "../services/fetchAllWorkspaces/fetchAllWorkspaces";
import { AllWorkspacesSchema } from "../types/AllWorkspacesSchema";

const initialState: AllWorkspacesSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const allWorkspacesSlice = createSlice({
    name: "allWorkspacesSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllWorkspaces.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    allWorkspacesAdapter.removeAll(state);
                }
            })
            .addCase(fetchAllWorkspaces.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    allWorkspacesAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    allWorkspacesAdapter.addMany(state, action.payload.rows);
                }

                state._isInitialized = true;
            })
            .addCase(fetchAllWorkspaces.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    allWorkspacesAdapter.removeAll(state);
                }
            })
            .addCase(
                createWorkspace.fulfilled,
                (state, action: PayloadAction<Workspace>) => {
                    allWorkspacesAdapter.addOne(state, action.payload);
                },
            )
            .addCase(
                updateWorkspace.fulfilled,
                (state, action: PayloadAction<Workspace>) => {
                    allWorkspacesAdapter.setOne(state, action.payload);
                },
            )
            .addCase(deleteWorkspace.fulfilled, (state, action) => {
                allWorkspacesAdapter.removeOne(state, action.meta.arg.id);
            });
    },
});

export const { actions: allWorkspacesActions, reducer: allWorkspacesReducer } =
    allWorkspacesSlice;
