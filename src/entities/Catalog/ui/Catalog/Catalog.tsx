/* eslint-disable ulbi-tv-plugin/layer-imports */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import {
    memo, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Catalog.module.scss';
import { useAppDispatch } from '@/app/Redux/store';
import { fetchProducts } from '@/app/Redux/products/asyncActions';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { selectProductData } from '@/app/Redux/products/selectors';
import { IProduct, Status } from '@/app/Redux/products/types';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { CatalogCard } from '../CatalogCard/CatalogCard';
import { CartItem } from '@/app/Redux/cart/types';
import { addItem, setIsCartModel } from '@/app/Redux/cart/slice';
import { Button } from '@/shared/ui/Button/Button';

interface CatalogProps {
  className?: string;
}

export const Catalog = memo(({ className }: CatalogProps) => {
    const dispatch = useAppDispatch();
    const [openedCardIndex, setOpenedCardIndex] = useState<number | null>(null);

    const handleCardDescriptionClick = (index: number) => {
        setOpenedCardIndex(index === openedCardIndex ? null : index);
    };
    const { products, status } = useSelector(selectProductData);

    const getProducts = async () => {
        dispatch(fetchProducts());
    };

    useEffect(() => {
        getProducts();
    }, []);

    function hasNumbers(value: string) {
        return /\d/.test(value);
    }

    const onClickAddToCart = useCallback((product: IProduct) => {
        if (hasNumbers(product.price)) {
            const item: CartItem = {
                ...product,
                count: 0,
            };
            dispatch(addItem(item));
        } else {
            dispatch(setIsCartModel({
                isCartModelOpen: true,
                isOrderModel: true,
            }));
        }
    }, []);

    return (
        <div id="catalog" className={classNames(styles.Catalog, {}, [className])}>

            <div className={styles.container}>
                <Text gap="32" title="Каталог" size={TextSize.XL} className="title" />

                <div className={styles.cardContainer}>
                    {
                        status === Status.LOADING ? (
                            [...Array(10)].map((_, index) => (
                                <div key={index} className={styles.card}>

                                    <div className={styles.cardImageContainer}>
                                        <Skeleton width="100%" height="100%" border="20px" />
                                    </div>

                                    <VStack max gap="4">
                                        <Skeleton width="100%" height="40px" border="20px" />

                                        <Skeleton width="100%" height="20px" border="20px" />
                                    </VStack>

                                </div>
                            ))
                        ) : products.map((product, index) => (
                            <Button key={index} onClick={() => handleCardDescriptionClick(index)}>
                                <CatalogCard
                                    onClickAddToCart={onClickAddToCart}
                                    product={product}
                                    index={index}
                                    openedCardIndex={openedCardIndex}
                                />
                            </Button>

                        ))
                    }
                </div>

            </div>

        </div>
    );
});
