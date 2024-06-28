import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    REFRESH_TOKEN_LOCALSTORAGE_KEY,
    TOKEN_LOCALSTORAGE_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/Shared/const/localStorage';
import { setFeatureFlags } from '@/Shared/lib/features';
import { initAuthData } from '../services/initAuthData';
import {
    ApplicationUser,
    ApplicationUserSchema,
} from '../types/applicationUser';
import { JsonSettings } from '../types/jsonSettings';
import { saveJsonSettings } from '../services/saveJsonSettings';
// eslint-disable-next-line avalserg-plugin/layer-imports
import { AuthResponse } from '@/Features/AuthByUserName';
import { logoutUser } from '../services/logoutUser';

const initialState: ApplicationUserSchema = {
    _inited: false,
};

export const applicationUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // authorization user save in
        setAuthData: (state, { payload }: PayloadAction<AuthResponse>) => {
            state.authData = payload.applicationUser;
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, payload.jwtToken);
            localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, payload.refreshToken);
        },

        logout: (state) => {
            // clear state
            state.authData = undefined;
            localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = payload;
                }
            },
        );
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<ApplicationUser>) => {
                state.authData = payload;
                setFeatureFlags(payload.features);
                state._inited = true;
            },
        );
        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true;
        });
       
        builder.addCase(
            logoutUser.fulfilled,
            (state) => {
                 state.authData = undefined;
                 localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
                 localStorage.removeItem(USER_LOCALSTORAGE_KEY);
                 localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
            },
        );
        builder.addCase(logoutUser.rejected, (state) => {
            state._inited = true;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = applicationUserSlice;
export const { reducer: applicationUserReducer } = applicationUserSlice;
