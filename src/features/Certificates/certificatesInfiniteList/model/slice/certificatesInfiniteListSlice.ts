import { Certificate } from "@/entities/Certificate";
import { createCertificate } from "@/features/Certificates/certificatesInfiniteList/model/services/createCertificate/createCertificate";
import { fetchInfiniteListCertificates } from "@/features/Certificates/certificatesInfiniteList/model/services/fetchInfiniteListCertificates/fetchInfiniteListCertificates";
import { removeCertificate } from "@/features/Certificates/certificatesInfiniteList/model/services/removeCertificate/removeCertificate";
import { updateCertificate } from "@/features/Certificates/certificatesInfiniteList/model/services/updateCertificate/updateCertificate";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { certificatesInfiniteListAdapter } from "../adapter/certificatesInfiniteListAdapter";
import { CertificatesInfiniteListSchema } from "../types/CertificatesInfiniteListSchema";

const initialState: CertificatesInfiniteListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const certificatesInfiniteListSlice = createSlice({
    name: "certificatesInfiniteListSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInfiniteListCertificates.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    certificatesInfiniteListAdapter.removeAll(state);
                }
            })
            .addCase(
                fetchInfiniteListCertificates.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.error = undefined;

                    // Если данные заменяются
                    if (action.meta.arg.replaceData) {
                        // Записываем новые данные
                        certificatesInfiniteListAdapter.setAll(
                            state,
                            action.payload.rows,
                        );
                    } else {
                        // Добавляем порцию данных
                        certificatesInfiniteListAdapter.addMany(
                            state,
                            action.payload.rows,
                        );
                    }

                    state._isInitialized = true;
                    // Есть ли еще данные
                    state.hasMore = action.payload.count > state.ids.length;
                },
            )
            .addCase(
                fetchInfiniteListCertificates.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            )
            .addCase(
                createCertificate.fulfilled,
                (state, action: PayloadAction<Certificate>) => {
                    certificatesInfiniteListAdapter.addOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(
                updateCertificate.fulfilled,
                (state, action: PayloadAction<Certificate>) => {
                    certificatesInfiniteListAdapter.setOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(removeCertificate.fulfilled, (state, action) => {
                certificatesInfiniteListAdapter.removeOne(
                    state,
                    action.meta.arg.id,
                );
            });
    },
});

export const {
    actions: certificatesInfiniteListActions,
    reducer: certificatesInfiniteListReducer,
} = certificatesInfiniteListSlice;
