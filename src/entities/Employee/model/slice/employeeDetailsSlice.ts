import { Berth } from "@/entities/Berth";
import { Department } from "@/entities/Department";
import { EmployeeDetailsSchema } from "@/entities/Employee";
import { getEmployee } from "@/entities/Employee/model/services/getEmployee/getEmployee";
import { Employee } from "@/entities/Employee/model/types/Employee";
import { updateBerth } from "@/features/Berthes/berthSelector/model/services/updateBerth/updateBerth";
import { updateDepartment } from "@/features/Departments/departmentDetailsCard/model/services/updateDepartment/updateDepartment";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: EmployeeDetailsSchema = {
    isDataLoading: false,
    dataError: undefined,
    employeeDetails: {},
    employeeDetailsForm: {},
    employeeDetailsFormAvatar: "",
    dataChanged: false,
    avatarChanged: false,
    _isInitialized: false,
};

export const employeeDetailsSlice = createSlice({
    name: "employeeDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Employee>) => {
            state.employeeDetailsForm = action.payload;
            state.dataChanged = true;
        },
        // Используется когда в форме выбирается файл на диске
        setEmployeeDetailsFormDataAvatar: (
            state,
            action: PayloadAction<string | undefined>,
        ) => {
            state.employeeDetailsFormAvatar = action.payload;
            state.avatarChanged = true;
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
            })
            .addCase(
                updateDepartment.fulfilled,
                (state, action: PayloadAction<Department>) => {
                    state.employeeDetailsForm = {
                        ...state.employeeDetailsForm,
                        department: action.payload,
                    };
                },
            )
            .addCase(
                updateBerth.fulfilled,
                (state, action: PayloadAction<Berth>) => {
                    state.employeeDetailsForm = {
                        ...state.employeeDetailsForm,
                        berth: action.payload,
                    };
                },
            );
    },
});

export const {
    actions: employeeDetailsActions,
    reducer: employeeDetailsReducer,
} = employeeDetailsSlice;
