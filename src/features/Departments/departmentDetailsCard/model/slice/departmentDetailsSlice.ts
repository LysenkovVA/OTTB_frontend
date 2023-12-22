import { Department } from "@/entities/Department";
import { createDepartment } from "@/features/Departments/departmentDetailsCard/model/services/createDepartment/createDepartment";
import { deleteDepartment } from "@/features/Departments/departmentDetailsCard/model/services/deleteDepartment/deleteEmployee";
import { getDepartment } from "@/features/Departments/departmentDetailsCard/model/services/getDepartment/getDepartment";
import { updateDepartment } from "@/features/Departments/departmentDetailsCard/model/services/updateDepartment/updateDepartment";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DepartmentDetailsSchema } from "../types/DepartmentDetailsSchema";

const initialState: DepartmentDetailsSchema = {
    isDataLoading: false,
    dataError: undefined,
    departmentDetails: { id: "", name: "", organization: { id: "", name: "" } },
    departmentDetailsForm: {
        id: "",
        name: "",
        organization: { id: "", name: "" },
    },
    _isInitialized: false,
};

export const departmentDetailsSlice = createSlice({
    name: "departmentDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Department>) => {
            state.departmentDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDepartment.pending, (state) => {
                state.isDataLoading = true;
                state.dataError = undefined;
            })
            .addCase(
                getDepartment.fulfilled,
                (state, action: PayloadAction<Department>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.departmentDetails = action.payload;
                    state.departmentDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(getDepartment.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(createDepartment.pending, (state) => {
                state.isDataLoading = true;
                state.dataError = undefined;
            })
            .addCase(
                createDepartment.fulfilled,
                (state, action: PayloadAction<Department>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.departmentDetails = action.payload;
                    state.departmentDetailsForm = action.payload;
                },
            )
            .addCase(createDepartment.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(updateDepartment.pending, (state) => {
                state.isDataLoading = true;
                state.dataError = undefined;
            })
            .addCase(
                updateDepartment.fulfilled,
                (state, action: PayloadAction<Department>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.departmentDetails = action.payload;
                    state.departmentDetailsForm = action.payload;
                },
            )
            .addCase(updateDepartment.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(deleteDepartment.pending, (state) => {
                state.isDataLoading = true;
                state.dataError = undefined;
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.isDataLoading = false;
                state.dataError = undefined;
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            });
    },
});

export const {
    actions: departmentDetailsActions,
    reducer: departmentDetailsReducer,
} = departmentDetailsSlice;
