import {
    ConstructionObject,
    ConstructionObjectDetailsSchema,
    getConstructionObject,
} from "@/entities/ConstructionObject";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ConstructionObjectDetailsSchema = {
    isLoading: false,
    error: undefined,
    constructionObjectDetails: { id: "", name: "" },
    constructionObjectDetailsForm: { id: "", name: "" },
    _isInitialized: false,
};

export const constructionObjectDetailsSlice = createSlice({
    name: "constructionObjectDetailsSlice",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<ConstructionObject>) => {
            state.constructionObjectDetailsForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConstructionObject.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(
                getConstructionObject.fulfilled,
                (state, action: PayloadAction<ConstructionObject>) => {
                    state.isLoading = false;
                    state.error = undefined;
                    state.constructionObjectDetails = action.payload;
                    state.constructionObjectDetailsForm = action.payload;
                    state._isInitialized = true;
                },
            )
            .addCase(getConstructionObject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: constructionObjectDetailsActions,
    reducer: constructionObjectDetailsReducer,
} = constructionObjectDetailsSlice;
