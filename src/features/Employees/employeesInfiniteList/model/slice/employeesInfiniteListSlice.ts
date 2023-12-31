import { Employee } from "@/entities/Employee";
import { updateBerth } from "@/features/Berthes/berthSelector/model/services/updateBerth/updateBerth";
import { updateDepartment } from "@/features/Departments/departmentDetailsCard/model/services/updateDepartment/updateDepartment";
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

                // Из-за include на бэкэнде иногда возвращается правильное количество записей
                // а сами записи не приходят!
                // и может возникнуть ситуация, когда условие action.payload.count > state.ids.length
                // будет отрабатывать неправильно, поэтому проверяем, если ничего не приходит, то
                // больше нечего загружать
                if (
                    action.payload.count > 0 &&
                    action.payload.rows.length === 0
                ) {
                    state.hasMore = false;
                } else {
                    state.hasMore = action.payload.count > state.ids.length;
                }
            })
            .addCase(fetchEmployeesInfiniteList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(
                createEmployee.fulfilled,
                (state, action: PayloadAction<Employee>) => {
                    employeesInfiniteListAdapter.addOne(state, action.payload);
                },
            )
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
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                employeesInfiniteListAdapter.removeOne(
                    state,
                    action.meta.arg.employeeId,
                );
            })
            // При обновлении подразделения нужно обновлять подразделение сотрудников в списке
            .addCase(updateDepartment.fulfilled, (state, action) => {
                // Выбираем всех работников для которых обновилась организация
                const employees = employeesInfiniteListAdapter
                    .getSelectors()
                    .selectAll(state)
                    .filter(
                        (empl) => empl.department?.id === action.meta.arg.id,
                    );

                // Обновляем значение организации
                employees.forEach((employee) => {
                    employeesInfiniteListAdapter.setOne(state, {
                        ...employee,
                        department: action.payload,
                    });
                });
            })
            // При обновлении должности нужно обновлять должность сотрудников в списке
            .addCase(updateBerth.fulfilled, (state, action) => {
                // Выбираем всех работников для которых обновилась организация
                const employees = employeesInfiniteListAdapter
                    .getSelectors()
                    .selectAll(state)
                    .filter((empl) => empl.berth?.id === action.meta.arg.id);

                // Обновляем значение организации
                employees.forEach((employee) => {
                    employeesInfiniteListAdapter.setOne(state, {
                        ...employee,
                        berth: action.payload,
                    });
                });
            });
    },
});

export const { actions: employeesInfiniteListActions } =
    employeesInfiniteListSlice;
export const { reducer: employeesInfiniteListReducer } =
    employeesInfiniteListSlice;
