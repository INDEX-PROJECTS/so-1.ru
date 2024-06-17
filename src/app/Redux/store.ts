import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import product from './products/slice';

export const store = configureStore({
    reducer: {
        product,
    },
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
