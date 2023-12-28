import { Department } from "@/entities/Department";
import { updateDepartment } from "@/features/Departments/departmentDetailsCard/model/services/updateDepartment/updateDepartment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allDepartmentsAdapter } from "../adapter/allDepartmentsAdapter";
import { fetchAllDepartments } from "../services/fetchAllDepartments/fetchAllDepartments";
import { AllDepartmentsSchema } from "../types/AllDepartmentsSchema";

const initialState: AllDepartmentsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const allDepartmentsSlice = createSlice({
    name: "allDepartmentsSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllDepartments.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    allDepartmentsAdapter.removeAll(state);
                }
            })
            .addCase(fetchAllDepartments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    allDepartmentsAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    allDepartmentsAdapter.addMany(state, action.payload.rows);
                }

                state._isInitialized = true;
            })
            .addCase(fetchAllDepartments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    allDepartmentsAdapter.removeAll(state);
                }
            })
            .addCase(
                updateDepartment.fulfilled,
                (state, action: PayloadAction<Department>) => {
                    allDepartmentsAdapter.setOne(state, action.payload);
                },
            );
    },
});

export const {
    actions: allDepartmentsActions,
    reducer: allDepartmentsReducer,
} = allDepartmentsSlice;
