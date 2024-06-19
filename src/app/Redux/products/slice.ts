import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct, IProductsSliceState, Status } from './types';
import { fetchProducts } from './asyncActions';

const initialState: IProductsSliceState = {
    products: [],
    status: Status.LOADING, // loading, success, error
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = Status.LOADING;
            state.products = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = Status.ERROR;
            state.products = [];
        });
    },
});

export const { setItems } = productSlice.actions;

export default productSlice.reducer;
