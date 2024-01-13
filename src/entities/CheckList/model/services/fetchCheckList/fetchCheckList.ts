import { ThunkConfig } from "@/app/providers/StoreProvider";
import { CheckList } from "@/entities/CheckList";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface FetchCheckListProps {
    id: string;
}

export const fetchCheckList = createAsyncThunk<
    CheckList,
    FetchCheckListProps,
    ThunkConfig<string>
>("fetchCheckList", async ({ id }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<CheckList>(`/check-lists/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Список не найден!");
    }
});
