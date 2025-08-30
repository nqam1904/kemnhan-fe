import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '..';

const initialState: any = {
    tokens: {
        accessToken: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, { payload }: PayloadAction<any>) => {
            state.tokens = payload;
        },
        resetAuth: () => initialState,
    },
});

export const { setTokens, resetAuth } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
