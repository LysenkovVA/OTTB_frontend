import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Workspace } from "@/entities/Workspace";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface FetchWorkspaceProps {
    id: string;
}

export const fetchWorkspace = createAsyncThunk<
    Workspace,
    FetchWorkspaceProps,
    ThunkConfig<string>
>("fetchWorkspace", async ({ id }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Workspace>(`/workspaces/${id}`);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Рабочее пространство не найдено!");
    }
});
