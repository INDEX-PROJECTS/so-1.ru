import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from './types';

export const fetchProducts = createAsyncThunk<IProduct[], void>('products/fetchProducts', async () => {
    const { data } = await axios.get<{ posts: IProduct[] }>(`${import.meta.env.VITE_BASE_URL}/posts?page=10`);

    return data.posts;
});
