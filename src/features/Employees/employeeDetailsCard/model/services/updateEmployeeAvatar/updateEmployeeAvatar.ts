import { ThunkConfig } from "@/app/providers/StoreProvider";
import { File, uploadFile } from "@/entities/File";
import { getEmployeeAvatarUploadRoute } from "@/shared/config/routeConfig/fileRoutes";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface UpdateEmployeeAvatarProps {
    employeeId: string;
    file: Blob;
}

export const updateEmployeeAvatar = createAsyncThunk<
    File | string | undefined,
    UpdateEmployeeAvatarProps,
    ThunkConfig<string>
>("employee/updateEmployeeAvatar", async ({ employeeId, file }, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
        const route = getEmployeeAvatarUploadRoute(employeeId);

        // return await dispatch(uploadFile({ route, file })).then(
        //     (result) => result.payload,
        // );
        return await dispatch(uploadFile({ route, file })).unwrap();
    } catch (e) {
        if (e instanceof AxiosError) {
            const serverError = e?.response?.data as ServerError;

            if (serverError) {
                return rejectWithValue(serverError.error);
            }
        }

        return rejectWithValue("Ошибка при загрузке аватара сотрудника!");
    }
});
