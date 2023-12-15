import { Employee } from "@/entities/Employee";
import { fetchEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/fetchEmployeesInfiniteList/fetchEmployeesInfiniteList";
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
        updateEmployee: (state, action: PayloadAction<Employee>) => {
            if (action.payload) {
                employeesInfiniteListAdapter.setOne(state, action.payload);
            }
        },
        addEmployee: (state, action: PayloadAction<Employee>) => {
            if (action.payload) {
                employeesInfiniteListAdapter.addOne(state, action.payload);
            }
        },
        removeOne: (state, action: PayloadAction<string>) => {
            employeesInfiniteListAdapter.removeOne(state, action.payload);
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
            });
    },
});

export const { actions: employeesInfiniteListActions } =
    employeesInfiniteListSlice;
export const { reducer: employeesInfiniteListReducer } =
    employeesInfiniteListSlice;
