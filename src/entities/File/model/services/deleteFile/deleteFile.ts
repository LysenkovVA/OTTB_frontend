import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getDeleteFileRoute } from "@/shared/config/routeConfig/fileRoutes";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface DeleteFileProps {
    fileId: string | undefined;
}

export const deleteFile = createAsyncThunk<
    void,
    DeleteFileProps,
    ThunkConfig<string>
>("files/deleteFile", async (props, thunkApi) => {
    const { fileId } = props;
    const { extra, rejectWithValue } = thunkApi;

    try {
        if (fileId) {
            const route = getDeleteFileRoute(fileId);

            const response = await extra.api.delete<void>(route);

            if (response.status === 500) {
                return rejectWithValue(
                    `Произошла ошибка при удалении файла! (${fileId})`,
                );
            }

            return response.data;
        }
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }
        return rejectWithValue(
            `Произошла ошибка при удалении файла! (${fileId})`,
        );
    }
});
