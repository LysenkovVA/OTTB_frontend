import { Employee } from "@/entities/Employee/model/types/Employee";
import { removeEmployeeAvatar } from "@/features/Employees/employeeDetailsCard/model/services/removeEmployeeAvatar/removeEmployeeAvatar";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchEmployeeDetailsById } from "../services/fetchEmployeeDetailsById/fetchEmployeeDetailsById";
import { updateEmployeeAvatar } from "../services/updateEmployeeAvatar/updateEmployeeAvatar";
import { updateEmployeeDetailsById } from "../services/updateEmployeeDetailsById/updateEmployeeDetailsById";
import { EmployeeDetailsSchema } from "../types/EmployeeDetailsSchema";

const initialState: EmployeeDetailsSchema = {
    isDataLoading: false,
    dataError: undefined,
    employeeDetails: {},
    employeeDetailsForm: {},
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
        setEmployeeDetailsFormData: (
            state,
            action: PayloadAction<Employee>,
        ) => {
            state.employeeDetailsForm = action.payload;
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
            .addCase(updateEmployeeDetailsById.pending, (state) => {
                state.isDataLoading = true;
                state.dataError = undefined;
            })
            .addCase(
                updateEmployeeDetailsById.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.employeeDetails = action.payload;
                    state.employeeDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(updateEmployeeDetailsById.rejected, (state, action) => {
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
