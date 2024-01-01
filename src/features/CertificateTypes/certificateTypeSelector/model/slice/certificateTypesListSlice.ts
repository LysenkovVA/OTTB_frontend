import { CertificateType } from "@/entities/CertificateType";
import { CertificateTypeListSchema } from "@/features/CertificateTypes/certificateTypeSelector";
import { certificateTypesListAdapter } from "@/features/CertificateTypes/certificateTypeSelector/model/adapter/certificateTypesListAdapter";
import { createCertificateType } from "@/features/CertificateTypes/certificateTypeSelector/model/services/createCertificateType/createCertificateType";
import { deleteCertificateType } from "@/features/CertificateTypes/certificateTypeSelector/model/services/deleteCertificateType/deleteCertificateType";
import { getCertificateTypesList } from "@/features/CertificateTypes/certificateTypeSelector/model/services/getCertificateTypesList/getCertificateTypesList";
import { updateCertificateType } from "@/features/CertificateTypes/certificateTypeSelector/model/services/updateCertificateType/updateCertificateType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CertificateTypeListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const certificateTypesListSlice = createSlice({
    name: "certificateTypesListSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCertificateTypesList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    certificateTypesListAdapter.removeAll(state);
                }
            })
            .addCase(getCertificateTypesList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    certificateTypesListAdapter.setAll(
                        state,
                        action.payload.rows,
                    );
                } else {
                    // Добавляем порцию данных
                    certificateTypesListAdapter.addMany(
                        state,
                        action.payload.rows,
                    );
                }

                state._isInitialized = true;
            })
            .addCase(getCertificateTypesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(
                createCertificateType.fulfilled,
                (state, action: PayloadAction<CertificateType>) => {
                    certificateTypesListAdapter.addOne(state, action.payload);
                },
            )
            .addCase(
                updateCertificateType.fulfilled,
                (state, action: PayloadAction<CertificateType>) => {
                    certificateTypesListAdapter.setOne(state, action.payload);
                },
            )
            .addCase(deleteCertificateType.fulfilled, (state, action) => {
                certificateTypesListAdapter.removeOne(
                    state,
                    action.meta.arg.id,
                );
            });
    },
});

export const {
    actions: certificateTypesListActions,
    reducer: certificateTypesListReducer,
} = certificateTypesListSlice;
