import { Employee } from "@/entities/Employee/model/types/Employee";
import { Organization } from "@/entities/Organization";
import { createEmployee } from "@/features/Employees/employeeDetailsCard/model/services/createEmployee/createEmployee";
import { removeEmployeeAvatar } from "@/features/Employees/employeeDetailsCard/model/services/removeEmployeeAvatar/removeEmployeeAvatar";
import { updateEmployee } from "@/features/Employees/employeeDetailsCard/model/services/updateEmployee/updateEmployee";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchEmployeeDetailsById } from "../services/fetchEmployeeDetailsById/fetchEmployeeDetailsById";
import { updateEmployeeAvatar } from "../services/updateEmployeeAvatar/updateEmployeeAvatar";
import { EmployeeDetailsSchema } from "../types/EmployeeDetailsSchema";

const initialState: EmployeeDetailsSchema = {
    isDataLoading: false,
    dataError: undefined,
    employeeDetails: {},
    employeeDetailsForm: {},
    employeeDetailsFormSelectedOrganization: undefined,
    isAvatarUploading: false,
    avatarUploadError: "",
    employeeDetailsFormAvatar: "",
    removeAvatarOnUpdate: false,
    _isInitialized: false,
};

export const employeeDetailsSlice = createSlice({
    name: "employeeDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Employee>) => {
            state.employeeDetailsForm = action.payload;
        },
        setFormDataSelectedOrganization: (
            state,
            action: PayloadAction<Organization | undefined>,
        ) => {
            state.employeeDetailsFormSelectedOrganization = action.payload;
        },
        // Используется когда в форме выбирается файл на диске
        setEmployeeDetailsFormDataAvatar: (
            state,
            action: PayloadAction<string | undefined>,
        ) => {
            state.employeeDetailsFormAvatar = action.payload;
        },
        setRemoveAvatarOnUpdate: (state, action: PayloadAction<boolean>) => {
            state.removeAvatarOnUpdate = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeDetailsById.pending, (state) => {
                state.isDataLoading = true;
                state.dataError = undefined;
            })
            .addCase(
                fetchEmployeeDetailsById.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.employeeDetails = action.payload;
                    state.employeeDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(fetchEmployeeDetailsById.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(createEmployee.pending, (state) => {
                state.isDataLoading = true;
                state.dataError = undefined;
            })
            .addCase(
                createEmployee.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.employeeDetails = action.payload;
                    state.employeeDetailsForm = action.payload;
                },
            )
            .addCase(createEmployee.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(updateEmployee.pending, (state) => {
                state.isDataLoading = true;
                state.dataError = undefined;
            })
            .addCase(
                updateEmployee.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.employeeDetails = action.payload;
                    state.employeeDetailsForm = action.payload;
                },
            )
            .addCase(updateEmployee.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(updateEmployeeAvatar.pending, (state) => {
                state.isAvatarUploading = true;
                state.avatarUploadError = undefined;
            })
            .addCase(updateEmployeeAvatar.fulfilled, (state, action) => {
                state.isAvatarUploading = false;
                state.avatarUploadError = undefined;
            })
            .addCase(updateEmployeeAvatar.rejected, (state, action) => {
                state.isAvatarUploading = false;
                state.avatarUploadError = action.payload;
            })
            .addCase(removeEmployeeAvatar.pending, (state) => {
                state.isAvatarUploading = true;
                state.avatarUploadError = undefined;
            })
            .addCase(removeEmployeeAvatar.fulfilled, (state, action) => {
                state.isAvatarUploading = false;
                state.avatarUploadError = undefined;
                state.removeAvatarOnUpdate = false;
            })
            .addCase(removeEmployeeAvatar.rejected, (state, action) => {
                state.isAvatarUploading = false;
                state.avatarUploadError = action.payload;
            });
    },
});

export const {
    actions: employeeDetailsActions,
    reducer: employeeDetailsReducer,
} = employeeDetailsSlice;
