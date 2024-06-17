import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct, IProductsSliceState, Status } from './types';
import { fetchProducts } from './asyncActions';

const initialState: IProductsSliceState = {
    products: [],
    status: Status.LOADING, // loading, success, error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<IProduct[][]>) {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = Status.LOADING;
            state.products = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
            for (let i = 0; i < action.payload.length; i += 12) {
                state.products.push(action.payload.slice(i, i + 12));
            }
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = Status.ERROR;
            state.products = [];
        });
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
