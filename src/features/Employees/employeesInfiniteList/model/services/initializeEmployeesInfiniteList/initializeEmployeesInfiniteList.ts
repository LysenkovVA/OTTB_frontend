import { ThunkConfig } from "@/app/providers/StoreProvider";
import { fetchEmployeesInfiniteList } from "@/features/Employees/employeesInfiniteList/model/services/fetchEmployeesInfiniteList/fetchEmployeesInfiniteList";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getEmployeesInfiniteListIsInitialized } from "../../selectors/employeesInfiniteListSelectors";
import { employeesInfiniteListActions } from "../../slice/employeesInfiniteListSlice";

/**
 * Требуется для инциализации начального состояния,
 * получает параметры из строки запроса в браузере
 */
export const initializeEmployeesInfiniteList = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    "employeesPage/initializeEmployeesInfiniteList",
    async (searchParams, thunkApi) => {
        const { getState, dispatch, rejectWithValue } = thunkApi;
        const isInitialized = getEmployeesInfiniteListIsInitialized(getState());

        try {
            if (!isInitialized) {
                // Получаем параметры из строки запроса
                const searchQueryFromUrl = searchParams.get("searchQuery");

                // Устанавливаем состояние
                if (searchQueryFromUrl) {
                    dispatch(
                        employeesInfiniteListActions.setSearchQuery(
                            searchQueryFromUrl,
                        ),
                    );
                }

                // Инициализируем стейт
                dispatch(employeesInfiniteListActions.initializeState());

                // Получаем сотрудников
                dispatch(fetchEmployeesInfiniteList({ replaceData: true }));
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                const serverError = e?.response?.data as ServerError;

                if (serverError) {
                    return rejectWithValue(serverError.error);
                }
            }

            return rejectWithValue("Ошибка инициализации списка сотрудников");
        }
    },
);
