import { ThunkConfig } from "@/app/providers/StoreProvider";
import { CheckList } from "@/entities/CheckList";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateCheckListProps {
    data: CheckList;
    workspaceId: string | undefined;
}

export const createCheckList = createAsyncThunk<
    CheckList,
    CreateCheckListProps,
    ThunkConfig<string>
>("createCheckList", async ({ data, workspaceId }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    if (!workspaceId) {
        return rejectWithValue("Рабочее пространство неизвестно!");
    }

    try {
        const response = await extra.api.post<CheckList>(
            "/check-lists/create",
            { ...data, id: undefined },
            {
                params: {
                    workspaceId,
                },
            },
        );

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Произошла ошибка при создании списка!");
    }
});
