import { InspectionType } from "@/entities/InspectionType";
import { InspectionTypeSelectorSchema } from "@/features/InspectionTypes/inspectionTypeSelector";
import { inspectionTypesSelectorAdapter } from "@/features/InspectionTypes/inspectionTypeSelector/model/adapter/inspectionTypesSelectorAdapter";
import { createInspectionType } from "@/features/InspectionTypes/inspectionTypeSelector/model/services/createInspectionType/createInspectionType";
import { deleteInspectionType } from "@/features/InspectionTypes/inspectionTypeSelector/model/services/deleteInspectionType/deleteInspectionType";
import { fetchInspectionTypesList } from "@/features/InspectionTypes/inspectionTypeSelector/model/services/getInspectionTypesList/getInspectionTypesList";
import { updateInspectionType } from "@/features/InspectionTypes/inspectionTypeSelector/model/services/updateInspectionType/updateInspectionType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InspectionTypeSelectorSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const inspectionTypesListSlice = createSlice({
    name: "inspectionTypesListSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInspectionTypesList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    inspectionTypesSelectorAdapter.removeAll(state);
                }
            })
            .addCase(fetchInspectionTypesList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    inspectionTypesSelectorAdapter.setAll(
                        state,
                        action.payload.rows,
                    );
                } else {
                    // Добавляем порцию данных
                    inspectionTypesSelectorAdapter.addMany(
                        state,
                        action.payload.rows,
                    );
                }

                state._isInitialized = true;
            })
            .addCase(fetchInspectionTypesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(
                createInspectionType.fulfilled,
                (state, action: PayloadAction<InspectionType>) => {
                    inspectionTypesSelectorAdapter.addOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(
                updateInspectionType.fulfilled,
                (state, action: PayloadAction<InspectionType>) => {
                    inspectionTypesSelectorAdapter.setOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(deleteInspectionType.fulfilled, (state, action) => {
                inspectionTypesSelectorAdapter.removeOne(
                    state,
                    action.meta.arg.id,
                );
            });
    },
});

export const {
    actions: inspectionTypesListActions,
    reducer: inspectionTypesListReducer,
} = inspectionTypesListSlice;
