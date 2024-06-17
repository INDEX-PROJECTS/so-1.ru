import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '@/shared/utils/calcTotalPrice';
import { getCartFromLS } from '@/shared/utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';

const initialState : CartSliceState = getCartFromLS();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id,
            );
            if (findItem) {
                findItem.count += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id,
            );
            if (findItem) {
                findItem.count -= 1;
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if (findItem) {
                state.totalPrice -= Number(findItem.price) * findItem.count;
                state.items = state.items.filter((obj) => obj.id !== action.payload.id);
            }
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const {
    addItem, removeItem, clearItems, minusItem,
} = cartSlice.actions;

export default cartSlice.reducer;
