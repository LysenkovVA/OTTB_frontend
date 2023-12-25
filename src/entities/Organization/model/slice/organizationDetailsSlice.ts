import { Organization } from "@/entities/Organization";
import { getOrganization } from "@/entities/Organization/model/services/getOrganization/getOrganization";
import { OrganizationDetailsSchema } from "@/entities/Organization/model/types/OrganizationDetailsSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: OrganizationDetailsSchema = {
    isLoading: false,
    error: "",
    organizationDetails: { id: "", name: "" },
    organizationDetailsForm: { id: "", name: "" },
    _isInitialized: false,
};

export const organizationDetailsSlice = createSlice({
    name: "organizationDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Organization>) => {
            state.organizationDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrganization.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getOrganization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.organizationDetails = action.payload;
                state.organizationDetailsForm = action.payload;
                state._isInitialized = true;
            })
            .addCase(getOrganization.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: organizationDetailsActions,
    reducer: organizationDetailsReducer,
} = organizationDetailsSlice;
