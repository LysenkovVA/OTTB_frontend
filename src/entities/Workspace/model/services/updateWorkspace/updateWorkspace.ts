import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Workspace } from "@/entities/Workspace";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateWorkspaceProps {
    id: string;
    data: Workspace;
}

export const updateWorkspace = createAsyncThunk<
    Workspace,
    UpdateWorkspaceProps,
    ThunkConfig<string>
>("updateWorkspace", async ({ id, data }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.patch<Workspace>(
            `/workspaces/${id}`,
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

        return rejectWithValue(
            "Произошла ошибка при обновлении рабочего пространства!",
        );
    }
});
