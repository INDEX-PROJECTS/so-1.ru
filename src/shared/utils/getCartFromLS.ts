/* eslint-disable ulbi-tv-plugin/layer-imports */
import { CartItem } from '@/app/Redux/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    const isCartModelOpen = false;
    const isOrderModel = false;

    return {
        items: items as CartItem[],
        totalPrice,
        isCartModelOpen,
        isOrderModel,
    };
};
