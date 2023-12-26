import { Berth, BerthDetailsSchema } from "@/entities/Berth";
import { getBerth } from "@/entities/Berth/model/services/getBerth/getBerth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: BerthDetailsSchema = {
    isLoading: false,
    error: undefined,
    berthDetails: { id: "", value: "" },
    berthDetailsForm: { id: "", value: "" },
    _isInitialized: false,
};

export const berthDetailsSlice = createSlice({
    name: "berthDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Berth>) => {
            state.berthDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBerth.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                getBerth.fulfilled,
                (state, action: PayloadAction<Berth>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.berthDetails = action.payload;
                    state.berthDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(getBerth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: berthDetailsActions, reducer: berthDetailsReducer } =
    berthDetailsSlice;
