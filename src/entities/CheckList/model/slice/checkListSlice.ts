import {
    CheckList,
    CheckListDetailsSchema,
    createCheckList,
    fetchCheckList,
    updateCheckList,
} from "@/entities/CheckList";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CheckListDetailsSchema = {
    isLoading: false,
    isUpdating: false,
    error: undefined,
    checkListDetails: { id: "", name: "" },
    checkListDetailsForm: { id: "", name: "" },
    _isInitialized: false,
};

export const checkListDetailsSlice = createSlice({
    name: "checkListDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<CheckList>) => {
            state.checkListDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCheckList.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                fetchCheckList.fulfilled,
                (state, action: PayloadAction<CheckList>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.checkListDetails = action.payload;
                    state.checkListDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(fetchCheckList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Создание списка
            .addCase(createCheckList.pending, (state, action) => {
                state.isUpdating = true;
                state.error = "";
            })
            .addCase(
                createCheckList.fulfilled,
                (state, action: PayloadAction<CheckList>) => {
                    state.isUpdating = false;
                    state.error = "";
                },
            )
            .addCase(createCheckList.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload;
            })
            // Обновление списка
            .addCase(updateCheckList.pending, (state, action) => {
                state.isUpdating = true;
                state.error = "";
            })
            .addCase(
                updateCheckList.fulfilled,
                (state, action: PayloadAction<CheckList>) => {
                    if (state.checkListDetailsForm.id === action.payload.id) {
                        state.checkListDetails = action.payload;
                        state.checkListDetailsForm = action.payload;
                    }

                    state.isUpdating = false;
                    state.error = "";
                },
            )
            .addCase(updateCheckList.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: checkListDetailsActions,
    reducer: checkListDetailsReducer,
} = checkListDetailsSlice;
