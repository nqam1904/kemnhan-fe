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

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const persist = (state: CartState) => {
  if (!state.length) {
    localStorage.removeItem('cart');
  } else {
    localStorage.setItem('cart', JSON.stringify(state));
  }
};

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
      const existing = state.find((item) => item.product.id === payload.product.id);
      if (existing) {
        existing.quantity = clamp(existing.quantity + 1, 1, 100);
      } else {
        state.push({ product: payload.product, quantity: clamp(payload.quantity || 1, 1, 100) });
      }
      persist(state);
    },
    updateCartItem: (
      state,
      { payload }: PayloadAction<{ id: string | number; quantities: number }>
    ) => {
      const existing = state.find((item) => item.product.id === payload.id);
      if (existing) {
        existing.quantity = clamp(existing.quantity + payload.quantities, 0, 100);
        if (existing.quantity === 0) {
          const idx = state.findIndex((i) => i.product.id === payload.id);
          if (idx !== -1) state.splice(idx, 1);
        }
      }
      persist(state);
    },
    removeCartItem: (state, { payload }: PayloadAction<{ id: string | number }>) => {
      const index = state.findIndex((item) => item.product.id === payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
      persist(state);
    },
    removeAllCart: (state) => {
      state.length = 0;
      persist(state);
    },
  },
});

export const { addToCart, updateCartItem, removeCartItem, removeAllCart } = cartSlice.actions;

export const cartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
