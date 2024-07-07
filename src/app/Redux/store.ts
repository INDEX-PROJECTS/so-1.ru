import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import product from './products/slice';
import cart from './cart/slice';
import notification from './notifications/slice';

export const store = configureStore({
    reducer: {
        notification,
        product,
        cart,
    },
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
