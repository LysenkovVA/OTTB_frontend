import { Department } from "@/entities/Department";
import { getDepartment } from "@/features/Departments/departmentDetailsCard/model/services/getDepartment/getDepartment";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DepartmentDetailsSchema } from "../types/DepartmentDetailsSchema";

const initialState: DepartmentDetailsSchema = {
    isDataLoading: false,
    dataError: undefined,
    departmentDetails: { id: "", name: "" },
    departmentDetailsForm: {
        id: "",
        name: "",
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
            });
    },
});

export const {
    actions: departmentDetailsActions,
    reducer: departmentDetailsReducer,
} = departmentDetailsSlice;
