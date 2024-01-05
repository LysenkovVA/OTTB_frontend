import { ThunkConfig } from "@/app/providers/StoreProvider";
import { BerthType } from "@/entities/BerthType";
import { InspectionType } from "@/entities/InspectionType";
import { ServerError } from "@/shared/error/ServerError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export interface CreateInspectionTypeProps {
    data: BerthType;
    workspaceId: string | undefined;
}

export const createInspectionType = createAsyncThunk<
    InspectionType,
    CreateInspectionTypeProps,
    ThunkConfig<string>
>("createInspectionType", async ({ data, workspaceId }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!workspaceId) {
        return rejectWithValue("Рабочее пространство неизвестно!");
    }

    try {
        const response = await extra.api.post<BerthType>(
            "/inspection-types/create",
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

        return rejectWithValue("Произошла ошибка при создании типа проверки!");
    }
});
