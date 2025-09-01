import type { Action, ThunkAction } from '@reduxjs/toolkit';

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { CONFIG } from '@/config-global';

import { RTKQueryApi } from './create-api';
import rootReducer from './reducers';

export const store = configureStore({
    reducer: rootReducer,
    devTools: CONFIG.nodeEnv === 'development',
    // * Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Suppress noisy non-serializable warnings from RTK Query error meta during development
            serializableCheck: false,
        }).concat(RTKQueryApi.middleware),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
