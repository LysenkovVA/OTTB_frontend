import { ThunkConfig } from "@/app/providers/StoreProvider";
import { getFileDownloadRoute } from "@/shared/config/routeConfig/fileRoutes";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface DownloadFileProps {
    fileId: string;
}

export const downloadFile = createAsyncThunk<
    string,
    DownloadFileProps,
    ThunkConfig<string>
>("files/downloadFile", async (props, thunkApi) => {
    const { fileId } = props;
    const { dispatch, extra, rejectWithValue, signal } = thunkApi;

    const route = getFileDownloadRoute(fileId);

    try {
        const response = await extra.api.get(route, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            responseType: "blob",
        });

        if (!response.data) {
            return rejectWithValue("Ответ от сервера не получен");
        }

        return URL.createObjectURL(response.data);
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }
        return rejectWithValue(
            `Произошла ошибка при получении файла! (${route})`,
        );
    }
});
