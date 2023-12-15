import { Organization } from "@/entities/Organization";
import { createOrganization } from "@/features/Organizations/organizationDetailsCard/model/services/createOrganization/createOrganization";
import { fetchOrganizationById } from "@/features/Organizations/organizationDetailsCard/model/services/fetchOrganizationById/fetchOrganizationById";
import { updateOrganization } from "@/features/Organizations/organizationDetailsCard/model/services/updateOrganization/updateOrganization";
import { OrganizationDetailsSchema } from "@/features/Organizations/organizationDetailsCard/model/types/organizationDetailsSchema";
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
            .addCase(fetchOrganizationById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchOrganizationById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.organizationDetails = action.payload;
                state.organizationDetailsForm = action.payload;
                state._isInitialized = true;
            })
            .addCase(fetchOrganizationById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createOrganization.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createOrganization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.organizationDetails = action.payload;
                state.organizationDetailsForm = action.payload;
            })
            .addCase(createOrganization.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateOrganization.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateOrganization.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.organizationDetails = action.payload;
                state.organizationDetailsForm = action.payload;
            })
            .addCase(updateOrganization.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: organizationDetailsActions,
    reducer: organizationDetailsReducer,
} = organizationDetailsSlice;
