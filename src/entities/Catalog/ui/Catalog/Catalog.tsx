/* eslint-disable ulbi-tv-plugin/layer-imports */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Catalog.module.scss';
import { useAppDispatch } from '@/app/Redux/store';
import { fetchProducts } from '@/app/Redux/products/asyncActions';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { selectProductData } from '@/app/Redux/products/selectors';
import { Status } from '@/app/Redux/products/types';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { CatalogCard } from '../CatalogCard/CatalogCard';

interface CatalogProps {
  className?: string;
}

export const Catalog = memo(({ className }: CatalogProps) => {
    const dispatch = useAppDispatch();
    const { products, status } = useSelector(selectProductData);

    const getProducts = async () => {
        dispatch(fetchProducts());
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div id="catalog" className={classNames(styles.Catalog, {}, [className])}>

            <div className={styles.container}>
                <Text gap="32" title="Каталог" size={TextSize.XL} />

                <Swiper
                    direction="vertical"
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        status === Status.LOADING ? (
                            <SwiperSlide>
                                {
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
                                }

                            </SwiperSlide>
                        ) : products.map((chunk, index) => (
                            <SwiperSlide key={index}>
                                {
                                    chunk.map((product, index) => (
                                        <CatalogCard product={product} key={index} />
                                    ))
                                }
                            </SwiperSlide>
                        ))
                    }

                </Swiper>

            </div>

        </div>
    );
});
