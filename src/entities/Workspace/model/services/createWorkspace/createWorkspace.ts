import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Workspace } from "@/entities/Workspace";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateWorkspaceProps {
    data: Workspace;
}

export const createWorkspace = createAsyncThunk<
    Workspace,
    CreateWorkspaceProps,
    ThunkConfig<string>
>("createWorkspace", async ({ data }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.post<Workspace>("/workspaces/create", {
            ...data,
            id: undefined,
        });

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
            "Произошла ошибка при создании рабочего пространства!",
        );
    }
});
