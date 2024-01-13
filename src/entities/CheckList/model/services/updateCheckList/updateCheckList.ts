import { ThunkConfig } from "@/app/providers/StoreProvider";
import { CheckList } from "@/entities/CheckList";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateCheckListProps {
    id: string;
    data: CheckList;
}

export const updateCheckList = createAsyncThunk<
    CheckList,
    UpdateCheckListProps,
    ThunkConfig<string>
>("updateCheckList", async ({ id, data }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<CheckList>(
            `/check-lists/${id}`,
            data,
        );

        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Произошла ошибка при обновлении списка!");
    }
});
