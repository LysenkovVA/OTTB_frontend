import { Workspace, WorkspaceDetailsSchema } from "@/entities/Workspace";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchWorkspace } from "../../services/fetchWorkspace/fetchWorkspace";

const initialState: WorkspaceDetailsSchema = {
    isLoading: false,
    error: undefined,
    workspaceDetails: { id: "", name: "" },
    workspaceDetailsForm: { id: "", name: "" },
    _isInitialized: false,
};

export const workspaceDetailsSlice = createSlice({
    name: "workspaceDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Workspace>) => {
            state.workspaceDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkspace.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchWorkspace.fulfilled,
                (state, action: PayloadAction<Workspace>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.workspaceDetails = action.payload;
                    state.workspaceDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(fetchWorkspace.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: workspaceDetailsActions,
    reducer: workspaceDetailsReducer,
} = workspaceDetailsSlice;
