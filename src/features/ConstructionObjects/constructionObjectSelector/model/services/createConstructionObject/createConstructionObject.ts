import { ThunkConfig } from "@/app/providers/StoreProvider";
import { ConstructionObject } from "@/entities/ConstructionObject";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateConstructionObjectProps {
    data: ConstructionObject;
    workspaceId: string | undefined;
}

export const createConstructionObject = createAsyncThunk<
    ConstructionObject,
    CreateConstructionObjectProps,
    ThunkConfig<string>
>("createConstructionObject", async ({ data, workspaceId }, thunkApi) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkApi;

    if (!workspaceId) {
        return rejectWithValue("Рабочее пространство неизвестно!");
    }

    try {
        const response = await extra.api.post<ConstructionObject>(
            "/construction-objects/create",
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

        return rejectWithValue("Произошла ошибка при создании объекта!");
    }
});
