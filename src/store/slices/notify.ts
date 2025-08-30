import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import type { NotifyState } from '../types/notify';

const initialState: NotifyState = {
    type: 'success',
    placement: 'topRight',
    message: 'Success',
    description: '',
    duration: 5,
};

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        showNotify: (state, { payload }: PayloadAction<NotifyState>) => {
            const newState = {
                ...state,
                ...payload,
            };

            return newState;
        },
    },
});

export const { showNotify } = notifySlice.actions;

export const notifySelector = (state: RootState) => state.notify;

export default notifySlice.reducer;
