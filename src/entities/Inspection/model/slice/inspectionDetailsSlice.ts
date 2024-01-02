import { Inspection, InspectionDetailsSchema } from "@/entities/Inspection";
import { getInspection } from "@/entities/Inspection/model/services/getInspection/getInspection";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InspectionDetailsSchema = {
    isLoading: false,
    error: "",
    inspectionDetails: { id: "" },
    inspectionDetailsForm: { id: "" },
    _isInitialized: false,
};

export const inspectionDetailsSlice = createSlice({
    name: "inspectionDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Inspection>) => {
            state.inspectionDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInspection.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getInspection.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.inspectionDetails = action.payload;
                state.inspectionDetailsForm = action.payload;
                state._isInitialized = true;
            })
            .addCase(getInspection.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: inspectionDetailsActions,
    reducer: inspectionDetailsReducer,
} = inspectionDetailsSlice;
