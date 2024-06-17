import { memo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CatalogCard.module.scss';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { IProduct } from '@/app/Redux/products/types';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';

interface CatalogCardProps {
  className?: string;
  product: IProduct;
}

export const CatalogCard = memo(({ className, product }: CatalogCardProps) => {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const toggleDetails = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };

    return (
        <Button onClick={toggleDetails} theme={ThemeButton.CLEAR}>
            <HStack gap="16" className={classNames(styles.CatalogCard, {}, [className])}>
                <VStack align="start" className={styles.card}>
                    <div className={styles.cardImageContainer}>
                        <img
                            src={`https://testguru.ru/parser/${product.image}`}
                            className={styles.cardImage}
                            alt={product.title}
                            height="100%"
                            width="100%"
                            draggable={false}
                        />
                    </div>

                    <Text gap="0" title={`${product.price} ₽`} bold={TextBold.BOLD} />

                    <Text gap="0" text={product.vendor_code} bold={TextBold.MEDIUM} />

                    <div className={styles.titleContainer}>
                        <Text gap="0" title={`${product.title}`} size={TextSize.S} bold={TextBold.MEDIUM} />
                    </div>

                </VStack>

                <CSSTransition
                    in={isDetailsVisible}
                    timeout={300}
                    unmountOnExit
                    classNames="slide-animation"
                >
                    <VStack justify="between" gap="16" align="start" className={styles.details}>
                        <VStack align="start" gap="8" className={styles.content}>
                            <Text gap="0" title={`${product.title}`} size={TextSize.S} bold={TextBold.MEDIUM} />

                            <Text gap="0" text={product.description} bold={TextBold.MEDIUM} />
                        </VStack>

                        <Button theme={ThemeButton.DEFAULT} className={styles.btn}>
                            Добавить
                        </Button>

                    </VStack>
                </CSSTransition>

            </HStack>
        </Button>

    );
});
