import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '..';

export interface CartProductRef {
    id: string | number;
}

export interface CartItem {
    product: CartProductRef;
    quantity: number;
}

type CartState = CartItem[];

const readInitialState = (): CartState => {
    try {
        const raw = localStorage.getItem('cart');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as CartState;
        return [];
    } catch {
        return [];
    }
};

const initialState: CartState = readInitialState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, { payload }: PayloadAction<CartItem>) => {
            if (state.length === 0) {
                state.push(payload);
            } else {
                const existing = state.find((item) => item.product.id === payload.product.id);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    state.push(payload);
                }
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        updateCartItem: (
            state,
            { payload }: PayloadAction<{ id: string | number; quantityDelta: number }>
        ) => {
            const existing = state.find((item) => item.product.id === payload.id);
            if (existing) {
                existing.quantity += payload.quantityDelta;
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeCartItem: (state, { payload }: PayloadAction<{ id: string | number }>) => {
            const index = state.findIndex((item) => item.product.id === payload.id);
            if (index !== -1) {
                state.splice(index, 1);
            }
            if (state.length === 0) {
                localStorage.removeItem('cart');
            } else {
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        removeAllCart: (state) => {
            state.length = 0;
            localStorage.removeItem('cart');
        },
    },
});

export const { addToCart, updateCartItem, removeCartItem, removeAllCart } = cartSlice.actions;

export const cartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
