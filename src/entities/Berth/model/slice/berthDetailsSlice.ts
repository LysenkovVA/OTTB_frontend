import { Berth, BerthDetailsSchema } from "@/entities/Berth";
import { getBerth } from "@/entities/Berth/model/services/getBerth/getBerth";
import { BerthType } from "@/entities/BerthType";
import { updateBerthType } from "@/features/BerthTypes/berthTypeSelector/model/services/updateBerthType/updateBerthType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: BerthDetailsSchema = {
    isLoading: false,
    error: undefined,
    berthDetails: { id: "", value: "", hasRank: false },
    berthDetailsForm: { id: "", value: "", hasRank: false },
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
            })
            .addCase(
                updateBerthType.fulfilled,
                (state, action: PayloadAction<BerthType>) => {
                    if (state.berthDetailsForm) {
                        state.berthDetailsForm = {
                            ...state.berthDetailsForm,
                            berthType: action.payload,
                        };
                    }
                },
            );
    },
});

export const { actions: berthDetailsActions, reducer: berthDetailsReducer } =
    berthDetailsSlice;
