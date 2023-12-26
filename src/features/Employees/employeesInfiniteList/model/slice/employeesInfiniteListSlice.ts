import { Employee } from "@/entities/Employee";
import { createEmployee } from "@/features/Employees/employeesInfiniteList/model/services/createEmployee/createEmployee";
import { deleteEmployee } from "@/features/Employees/employeesInfiniteList/model/services/deleteEmployee/deleteEmployee";
import { deleteEmployeeAvatar } from "@/features/Employees/employeesInfiniteList/model/services/deleteEmployeeAvatar/deleteEmployeeAvatar";
import { fetchEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/fetchEmployeesInfiniteList/fetchEmployeesInfiniteList";
import { updateEmployee } from "@/features/Employees/employeesInfiniteList/model/services/updateEmployee/updateEmployee";
import { updateEmployeeAvatar } from "@/features/Employees/employeesInfiniteList/model/services/updateEmployeeAvatar/updateEmployeeAvatar";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { employeesInfiniteListAdapter } from "../adapter/employeesInfiniteListAdapter";
import { EmployeesInfiniteListSchema } from "../types/EmployeesInfiniteListSchema";

const initialState: EmployeesInfiniteListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    searchQuery: "",
    _isInitialized: false,
};

export const employeesInfiniteListSlice = createSlice({
    name: "employeesInfiniteListSlice",
    initialState,
    reducers: {
        initializeState: (state) => {
            state._isInitialized = true;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string | undefined>) => {
            state.searchQuery = action.payload;
            state.offset = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeesInfiniteList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    employeesInfiniteListAdapter.removeAll(state);
                }
            })
            .addCase(fetchEmployeesInfiniteList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    employeesInfiniteListAdapter.setAll(
                        state,
                        action.payload.rows,
                    );
                } else {
                    // Добавляем порцию данных
                    employeesInfiniteListAdapter.addMany(
                        state,
                        action.payload.rows,
                    );
                }

                // Есть ли еще данные
                state.hasMore = action.payload.count > state.ids.length;
            })
            .addCase(fetchEmployeesInfiniteList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createEmployee.pending, (state) => {})
            .addCase(
                createEmployee.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    employeesInfiniteListAdapter.addOne(state, action.payload);
                },
            )
            .addCase(createEmployee.rejected, (state, action) => {})
            .addCase(updateEmployee.pending, (state) => {})
            .addCase(
                updateEmployee.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    employeesInfiniteListAdapter.setOne(state, action.payload);
                },
            )
            .addCase(updateEmployeeAvatar.fulfilled, (state, action) => {
                const employee = employeesInfiniteListAdapter
                    .getSelectors()
                    .selectById(state, action.meta.arg.employeeId);
                const avatar = action.payload;

                if (employee && avatar) {
                    employeesInfiniteListAdapter.setOne(state, {
                        ...employee,
                        avatar,
                    });
                }
            })
            .addCase(deleteEmployeeAvatar.fulfilled, (state, action) => {
                const employee = employeesInfiniteListAdapter
                    .getSelectors()
                    .selectById(state, action.meta.arg.employeeId);

                if (employee) {
                    employeesInfiniteListAdapter.setOne(state, {
                        ...employee,
                        avatar: undefined,
                    });
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {})
            .addCase(deleteEmployee.pending, (state, action) => {})
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                employeesInfiniteListAdapter.removeOne(
                    state,
                    action.meta.arg.employeeId,
                );
            })
            .addCase(deleteEmployee.rejected, (state, action) => {});
    },
});

export const { actions: employeesInfiniteListActions } =
    employeesInfiniteListSlice;
export const { reducer: employeesInfiniteListReducer } =
    employeesInfiniteListSlice;
