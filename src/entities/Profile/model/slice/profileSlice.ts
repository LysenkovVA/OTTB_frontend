import { Profile } from "@/entities/Profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { ProfileSchema } from "../types/ProfileSchema";

const initialState: ProfileSchema = {
    isDataLoading: false,
    dataError: "",
    profileData: {},
    profileFormData: {},
    profileFormDataAvatar: undefined,
    _isDataInitialized: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<Profile>) => {
            state.profileFormData = action.payload;
        },
        // Используется когда в форме выбирается файл на диске
        setProfileFormDataAvatar: (
            state,
            action: PayloadAction<string | undefined>,
        ) => {
            state.profileFormDataAvatar = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state, action) => {
                state.dataError = undefined;
                state.isDataLoading = true;
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.profileData = action.payload;
                    state.profileFormData = action.payload;
                    state._isDataInitialized = true;
                },
            )
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            })
            .addCase(updateProfileData.pending, (state, action) => {
                state.dataError = undefined;
                state.isDataLoading = true;
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isDataLoading = false;
                    state.dataError = undefined;
                    state.profileData = action.payload;
                    state.profileFormData = action.payload;
                },
            )
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isDataLoading = false;
                state.dataError = action.payload;
            });
    },
});

export const { actions: profileActions, reducer: profileReducer } =
    profileSlice;
