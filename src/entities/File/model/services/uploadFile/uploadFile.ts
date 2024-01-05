// import { ThunkConfig } from "@/app/providers/StoreProvider";
// import { File } from "@/entities/File";
// import { ServerError } from "@/shared/error/ServerError";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { AxiosError, AxiosHeaders } from "axios";
//
// export interface UploadFileProps {
//     route: string;
//     file: Blob;
//     fileName?: string;
// }
//
// /**
//  * @deprecated
//  */
// export const uploadFile = createAsyncThunk<
//     File,
//     UploadFileProps,
//     ThunkConfig<string>
// >("files/uploadFile", async (props, thunkApi) => {
//     const { route, file, fileName } = props;
//     const { dispatch, extra, rejectWithValue } = thunkApi;
//
//     try {
//         if (!file) {
//             return rejectWithValue("Файл для передачи не задан!");
//         }
//
//         const formData = new FormData();
//         formData.append("file", file, fileName ?? "filename");
//
//         const headers = new AxiosHeaders();
//         headers.setContentType("multipart/form-data");
//
//         const response = await extra.api.post<File>(route, formData, {
//             headers,
//         });
//
//         if (!response.data) {
//             return rejectWithValue("Ответ от сервера не получен");
//         }
//
//         return response.data;
//     } catch (e) {
//         if (e instanceof AxiosError) {
//             const serverError = e?.response?.data as ServerError;
//
//             if (serverError) {
//                 return rejectWithValue(serverError.error);
//             }
//         }
//         return rejectWithValue(
//             `Произошла ошибка при отправке файла! (${route})`,
//         );
//     }
// });
