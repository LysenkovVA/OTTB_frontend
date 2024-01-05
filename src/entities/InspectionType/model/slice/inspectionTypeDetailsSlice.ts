import {
    InspectionType,
    InspectionTypeDetailsSchema,
} from "@/entities/InspectionType";
import { getInspectionType } from "@/entities/InspectionType/model/services/getInspectionType/getInspectionType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InspectionTypeDetailsSchema = {
    isLoading: false,
    error: undefined,
    inspectionTypeDetails: { id: "", value: "" },
    inspectionTypeDetailsForm: { id: "", value: "" },
    _isInitialized: false,
};

export const inspectionTypeDetailsSlice = createSlice({
    name: "inspectionTypeDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<InspectionType>) => {
            state.inspectionTypeDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInspectionType.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                getInspectionType.fulfilled,
                (state, action: PayloadAction<InspectionType>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.inspectionTypeDetails = action.payload;
                    state.inspectionTypeDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(getInspectionType.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: inspectionTypeDetailsActions,
    reducer: inspectionTypeDetailsReducer,
} = inspectionTypeDetailsSlice;
