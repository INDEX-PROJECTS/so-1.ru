import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from './types';

export const fetchProducts = createAsyncThunk<IProduct[], void>('products/fetchProducts', async (params) => {
    const { data } = await axios.get<{ posts: IProduct[] }>('https://testguru.ru/parser/posts?page=10');

    return data.posts;
});
