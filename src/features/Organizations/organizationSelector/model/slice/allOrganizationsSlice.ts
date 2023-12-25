import { Organization } from "@/entities/Organization";
import {
    createOrganization,
    removeOrganization,
    updateOrganization,
} from "@/features/Organizations/organizationsInfiniteList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allOrganizationsAdapter } from "../adapter/allOrganizationsAdapter";
import { fetchAllOrganizations } from "../services/fetchAllOrganizations/fetchAllOrganizations";
import { AllOrganizationsSchema } from "../types/AllOrganizationsSchema";

const initialState: AllOrganizationsSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const allOrganizationsSlice = createSlice({
    name: "allOrganizationsSlice",
    initialState,
    reducers: {
        // addOne: (state, action: PayloadAction<Organization>) => {
        //     allOrganizationsAdapter.addOne(state, action.payload);
        // },
        // setOne: (state, action: PayloadAction<Organization>) => {
        //     allOrganizationsAdapter.setOne(state, action.payload);
        // },
        // removeOne: (state, action: PayloadAction<string>) => {
        //     allOrganizationsAdapter.removeOne(state, action.payload);
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrganizations.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    allOrganizationsAdapter.removeAll(state);
                }
            })
            .addCase(fetchAllOrganizations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    allOrganizationsAdapter.setAll(state, action.payload.rows);
                } else {
                    // Добавляем порцию данных
                    allOrganizationsAdapter.addMany(state, action.payload.rows);
                }

                state._isInitialized = true;
            })
            .addCase(fetchAllOrganizations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createOrganization.pending, (state, action) => {})
            .addCase(
                createOrganization.fulfilled,
                (state, action: PayloadAction<Organization>) => {
                    allOrganizationsAdapter.addOne(state, action.payload);
                },
            )
            .addCase(createOrganization.rejected, (state, action) => {})
            .addCase(updateOrganization.pending, (state, action) => {})
            .addCase(
                updateOrganization.fulfilled,
                (state, action: PayloadAction<Organization>) => {
                    allOrganizationsAdapter.setOne(state, action.payload);
                },
            )
            .addCase(updateOrganization.rejected, (state, action) => {})
            .addCase(removeOrganization.pending, (state, action) => {})
            .addCase(removeOrganization.fulfilled, (state, action) => {
                allOrganizationsAdapter.removeOne(
                    state,
                    action.meta.arg.organizationId,
                );
            })
            .addCase(removeOrganization.rejected, (state, action) => {});
    },
});

export const {
    actions: allOrganizationsActions,
    reducer: allOrganizationsReducer,
} = allOrganizationsSlice;
