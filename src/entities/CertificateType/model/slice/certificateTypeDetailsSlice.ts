import {
    CertificateType,
    CertificateTypeDetailsSchema,
} from "@/entities/CertificateType";
import { getCertificateType } from "@/entities/CertificateType/model/services/getCertificateType/getCertificateType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CertificateTypeDetailsSchema = {
    isLoading: false,
    error: undefined,
    certificateTypeDetails: { id: "", value: "" },
    certificateTypeDetailsForm: { id: "", value: "" },
    _isInitialized: false,
};

export const certificateTypeDetailsSlice = createSlice({
    name: "certificateTypeDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<CertificateType>) => {
            state.certificateTypeDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCertificateType.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                getCertificateType.fulfilled,
                (state, action: PayloadAction<CertificateType>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.certificateTypeDetails = action.payload;
                    state.certificateTypeDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(getCertificateType.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: certificateTypeDetailsActions,
    reducer: certificateTypeDetailsReducer,
} = certificateTypeDetailsSlice;
