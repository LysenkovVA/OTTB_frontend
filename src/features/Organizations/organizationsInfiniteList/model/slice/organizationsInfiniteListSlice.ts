import { Organization } from "@/entities/Organization";
import { createOrganization } from "@/features/Organizations/organizationsInfiniteList/model/services/createOrganization/createOrganization";
import { fetchOrganizationsInfiniteList } from "@/features/Organizations/organizationsInfiniteList/model/services/fetchOrganizationsInfiniteList/fetchOrganizationsInfiniteList";
import { removeOrganization } from "@/features/Organizations/organizationsInfiniteList/model/services/removeOrganization/removeOrganization";
import { updateOrganization } from "@/features/Organizations/organizationsInfiniteList/model/services/updateOrganization/updateOrganization";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { organizationsInfiniteListAdapter } from "../adapter/organizationsInfiniteListAdapter";
import { OrganizationsInfiniteListSchema } from "../types/OrganizationsInfiniteListSchema";

const initialState: OrganizationsInfiniteListSchema = {
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
    limit: 10,
    offset: 0,
    hasMore: true,
    _isInitialized: false,
};

export const organizationsInfiniteListSlice = createSlice({
    name: "organizationsInfiniteListSlice",
    initialState,
    reducers: {
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchOrganizationsInfiniteList.pending,
                (state, action) => {
                    state.isLoading = true;
                    state.error = undefined;

                    // Если данные заменяются
                    if (action.meta.arg.replaceData) {
                        // Очищаем старые
                        organizationsInfiniteListAdapter.removeAll(state);
                    }
                },
            )
            .addCase(
                fetchOrganizationsInfiniteList.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.error = undefined;

                    // Если данные заменяются
                    if (action.meta.arg.replaceData) {
                        // Записываем новые данные
                        organizationsInfiniteListAdapter.setAll(
                            state,
                            action.payload.rows,
                        );
                    } else {
                        // Добавляем порцию данных
                        organizationsInfiniteListAdapter.addMany(
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
                fetchOrganizationsInfiniteList.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            )
            .addCase(createOrganization.pending, (state, action) => {})
            .addCase(
                createOrganization.fulfilled,
                (state, action: PayloadAction<Organization>) => {
                    organizationsInfiniteListAdapter.addOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(createOrganization.rejected, (state, action) => {})
            .addCase(updateOrganization.pending, (state, action) => {})
            .addCase(
                updateOrganization.fulfilled,
                (state, action: PayloadAction<Organization>) => {
                    organizationsInfiniteListAdapter.setOne(
                        state,
                        action.payload,
                    );
                },
            )
            .addCase(updateOrganization.rejected, (state, action) => {})
            .addCase(removeOrganization.pending, (state, action) => {})
            .addCase(removeOrganization.fulfilled, (state, action) => {
                organizationsInfiniteListAdapter.removeOne(
                    state,
                    action.meta.arg.organizationId,
                );
            })
            .addCase(removeOrganization.rejected, (state, action) => {});
    },
});

export const {
    actions: organizationsInfiniteListActions,
    reducer: organizationsInfiniteListReducer,
} = organizationsInfiniteListSlice;
