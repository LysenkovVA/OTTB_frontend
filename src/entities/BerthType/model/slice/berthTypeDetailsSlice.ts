import { BerthType } from "@/entities/BerthType";
import { getBerthType } from "@/entities/BerthType/model/services/getBerthType/getBerthType";
import { BerthTypeDetailsSchema } from "@/entities/BerthType/model/types/BerthTypeDetailsSchema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: BerthTypeDetailsSchema = {
    isLoading: false,
    error: undefined,
    berthTypeDetails: { id: "", value: "" },
    berthTypeDetailsForm: { id: "", value: "" },
    _isInitialized: false,
};

export const berthTypeDetailsSlice = createSlice({
    name: "berthTypeDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<BerthType>) => {
            state.berthTypeDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBerthType.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                getBerthType.fulfilled,
                (state, action: PayloadAction<BerthType>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.berthTypeDetails = action.payload;
                    state.berthTypeDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(getBerthType.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: berthTypeDetailsActions,
    reducer: berthTypeDetailsReducer,
} = berthTypeDetailsSlice;
