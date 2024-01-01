import { Certificate, CertificateDetailsSchema } from "@/entities/Certificate";
import { getCertificate } from "@/entities/Certificate/model/services/getCertificate/getCertificate";
import { CertificateType } from "@/entities/CertificateType";
import { updateCertificateType } from "@/features/CertificateTypes/certificateTypeSelector/model/services/updateCertificateType/updateCertificateType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CertificateDetailsSchema = {
    isLoading: false,
    error: undefined,
    certificateDetails: { id: "" },
    certificateDetailsForm: { id: "" },
    _isInitialized: false,
};

export const certificateDetailsSlice = createSlice({
    name: "certificateDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Certificate>) => {
            state.certificateDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCertificate.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                getCertificate.fulfilled,
                (state, action: PayloadAction<Certificate>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.certificateDetails = action.payload;
                    state.certificateDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(getCertificate.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(
                updateCertificateType.fulfilled,
                (state, action: PayloadAction<CertificateType>) => {
                    if (state.certificateDetailsForm) {
                        state.certificateDetailsForm = {
                            ...state.certificateDetailsForm,
                            certificateType: action.payload,
                        };
                    }
                },
            );
    },
});

export const {
    actions: certificateDetailsActions,
    reducer: certificateDetailsReducer,
} = certificateDetailsSlice;
