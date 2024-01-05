import { Organization } from "@/entities/Organization";
import { fetchOrganizations } from "@/features/Organizations/organizationSelector/model/services/fetchOrganizations/fetchOrganizations";
import {
    createOrganization,
    removeOrganization,
    updateOrganization,
} from "@/features/Organizations/organizationsInfiniteList";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { organizationSelectorAdapter } from "../adapter/organizationSelectorAdapter";
import { OrganizationSelectorSchema } from "../types/OrganizationSelectorSchema";

const initialState: OrganizationSelectorSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    _isInitialized: false,
};

export const organizationSelectorSlice = createSlice({
    name: "organizationSelectorSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrganizations.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Очищаем старые
                    organizationSelectorAdapter.removeAll(state);
                }
            })
            .addCase(fetchOrganizations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;

                // Если данные заменяются
                if (action.meta.arg.replaceData) {
                    // Записываем новые данные
                    organizationSelectorAdapter.setAll(
                        state,
                        action.payload.rows,
                    );
                } else {
                    // Добавляем порцию данных
                    organizationSelectorAdapter.addMany(
                        state,
                        action.payload.rows,
                    );
                }
                state._isInitialized = true;
            })
            .addCase(fetchOrganizations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(
                createOrganization.fulfilled,
                (state, action: PayloadAction<Organization>) => {
                    organizationSelectorAdapter.addOne(state, action.payload);
                },
            )
            .addCase(
                updateOrganization.fulfilled,
                (state, action: PayloadAction<Organization>) => {
                    organizationSelectorAdapter.setOne(state, action.payload);
                },
            )
            .addCase(removeOrganization.fulfilled, (state, action) => {
                organizationSelectorAdapter.removeOne(
                    state,
                    action.meta.arg.organizationId,
                );
            });
    },
});

export const {
    actions: organizationSelectorActions,
    reducer: organizationSelectorReducer,
} = organizationSelectorSlice;
