import { EmployeeDetailsSchema } from "@/entities/Employee";
import { getEmployee } from "@/entities/Employee/model/services/getEmployee/getEmployee";
import { Employee } from "@/entities/Employee/model/types/Employee";
import { Organization } from "@/entities/Organization";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: EmployeeDetailsSchema = {
    isDataLoading: false,
    dataError: undefined,
    employeeDetails: {},
    employeeDetailsForm: {},
    employeeDetailsFormSelectedOrganization: undefined, // TODO Удалить, т.к. организация будет в работнике
    employeeDetailsFormAvatar: "",
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployee.pending, (state) => {
                state.isDataLoading = true;
                state.dataError = undefined;
            })
            .addCase(
                getEmployee.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.employeeDetails = action.payload;
                    state.employeeDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(getEmployee.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            });
    },
});

export const {
    actions: employeeDetailsActions,
    reducer: employeeDetailsReducer,
} = employeeDetailsSlice;
