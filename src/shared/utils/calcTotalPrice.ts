/* eslint-disable ulbi-tv-plugin/layer-imports */
import { CartItem } from '@/app/Redux/cart/types';

export const calcTotalPrice = (items: CartItem[]) => items.reduce((sum, obj) => Number(obj.price) * obj.count + sum, 0);
