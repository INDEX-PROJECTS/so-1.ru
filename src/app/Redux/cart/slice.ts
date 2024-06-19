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
                (obj) => obj.title === action.payload.title,
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
                (obj) => obj.title === action.payload.title,
            );
            if (findItem) {
                findItem.count -= 1;
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.title === action.payload.title);

            if (findItem) {
                state.totalPrice -= Number(findItem.price) * findItem.count;
                state.items = state.items.filter((obj) => obj.title !== action.payload.title);
            }
        },
        setCount(state, action: PayloadAction<{count: number; item: CartItem}>) {
            const { count, item } = action.payload;
            const findItem = state.items.find((obj) => obj.title === item.title);

            if (findItem) {
                findItem.count = count;
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
        setIsCartModel(state, action: PayloadAction<{isCartModelOpen: boolean, isOrderModel: boolean}>) {
            const { isCartModelOpen, isOrderModel } = action.payload;
            state.isOrderModel = isOrderModel;
            state.isCartModelOpen = isCartModelOpen;
        },
    },
});

export const {
    addItem, removeItem, clearItems, minusItem, setCount, setIsCartModel,
} = cartSlice.actions;

export default cartSlice.reducer;
