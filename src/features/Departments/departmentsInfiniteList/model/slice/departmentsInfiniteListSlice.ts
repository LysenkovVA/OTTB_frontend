import { Department } from "@/entities/Department";
import { createDepartment } from "@/features/Departments/departmentDetailsCard/model/services/createDepartment/createDepartment";
import { deleteDepartment } from "@/features/Departments/departmentDetailsCard/model/services/deleteDepartment/deleteEmployee";
import { updateDepartment } from "@/features/Departments/departmentDetailsCard/model/services/updateDepartment/updateDepartment";
import { fetchDepartmentsInfiniteList } from "@/features/Departments/departmentsInfiniteList/model/services/fetchDepartmentsInfiniteList/fetchDepartmentsInfiniteList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { departmentsInfiniteListAdapter } from "../adapter/departmentsInfiniteListAdapter";
import { DepartmentsInfiniteListSchema } from "../types/DepartmentsInfiniteListSchema";

const initialState: DepartmentsInfiniteListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const departmentsInfiniteListSlice = createSlice({
    name: "departmentsInfiniteListSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartmentsInfiniteList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    departmentsInfiniteListAdapter.removeAll(state);
                }
            })
            .addCase(
                fetchDepartmentsInfiniteList.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.error = undefined;

                    // Если данные заменяются
                    if (action.meta.arg.replaceData) {
                        // Записываем новые данные
                        departmentsInfiniteListAdapter.setAll(
                            state,
                            action.payload.rows,
                        );
                    } else {
                        // Добавляем порцию данных
                        departmentsInfiniteListAdapter.addMany(
                            state,
                            action.payload.rows,
                        );
                    }

                    state._isInitialized = true;
                    // Есть ли еще данные
                    state.hasMore = action.payload.count > state.ids.length;
                },
            )
            .addCase(fetchDepartmentsInfiniteList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(
                createDepartment.fulfilled,
                (state, action: PayloadAction<Department>) => {
                    departmentsInfiniteListAdapter.addOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(
                updateDepartment.fulfilled,
                (state, action: PayloadAction<Department>) => {
                    departmentsInfiniteListAdapter.setOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                departmentsInfiniteListAdapter.removeOne(
                    state,
                    action.meta.arg.departmentId,
                );
            });
    },
});

export const {
    actions: departmentsInfiniteListActions,
    reducer: departmentsInfiniteListReducer,
} = departmentsInfiniteListSlice;
