import { IProduct } from '../products/types';

export interface CartItem extends IProduct {
  count: number;
}

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
