import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Department } from "@/entities/Department";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateDepartmentProps {
    department: Department;
    workspaceId: string;
}

export const createDepartment = createAsyncThunk<
    Department,
    CreateDepartmentProps,
    ThunkConfig<string>
>(
    "department/createDepartment",
    async ({ department, workspaceId }, thunkApi) => {
        const { dispatch, extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await extra.api.post<Department>(
                "/departments/create",
                { ...department, id: undefined },
                {
                    params: {
                        workspaceId,
                    },
                },
            );

            if (!response.data) {
                return rejectWithValue("Ответ от сервера не получен");
            }

            return response.data;
        } catch (e) {
            if (e instanceof AxiosError) {
                const serverError = e?.response?.data as ServerError;

                if (serverError) {
                    return rejectWithValue(serverError.error);
                }
            }

            return rejectWithValue(
                "Произошла ошибка при создании подразделения!",
            );
        }
    },
);
