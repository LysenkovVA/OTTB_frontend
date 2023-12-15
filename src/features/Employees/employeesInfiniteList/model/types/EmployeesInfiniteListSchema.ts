import { Employee } from "@/entities/Employee/model/types/Employee";
import { EntityState } from "@reduxjs/toolkit";

export interface EmployeesInfiniteListSchema extends EntityState<Employee> {
    // Состояния
    isLoading?: boolean;
    error?: string;
    // Пагинация
    limit: number;
    offset: number;
    hasMore: boolean;
    // Фильтры
    searchQuery?: string;
    // Флаг инициализации состояния из строки запроса
    _isInitialized: boolean;
}
