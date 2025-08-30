import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

const initialState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: () => initialState,
    },
});

export const { resetUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
