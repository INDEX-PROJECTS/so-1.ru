/* eslint-disable react/no-array-index-key */
import { memo, useState } from 'react';

import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CartForm.module.scss';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { selectCart } from '@/app/Redux/cart/selectors';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { getEnding } from '@/shared/utils/getEndings';
import { Counter } from '@/shared/ui/Counter/Counter';
import { useAppDispatch } from '@/app/Redux/store';
import { clearItems } from '@/app/Redux/cart/slice';
import { formatNumber } from '@/shared/utils/formatNumber';

export interface CartFormProps {
  className?: string;
  onSuccess: () => void;
}

export const CartForm = memo(({ className, onSuccess }: CartFormProps) => {
    const [checked, setChecked] = useState(false);

    const dispatch = useAppDispatch();

    const { items, totalPrice } = useSelector(selectCart);

    const handleChange = () => {
        setChecked(!checked);
    };

    const onCliclClearAll = () => {
        dispatch(clearItems());
        onSuccess();
    };

    if (items.length === 0) {
        return (
            <HStack max justify="center" align="center" className={styles.cartEmpty}>

                <Text gap="0" text="Корзина пуста" />

            </HStack>
        );
    }

    return (
        <div className={classNames(styles.CartForm, {}, [className])}>
            <div className={styles.top}>
                <div className={styles.header}>
                    <Text gap="0" title={`${items.length} ${getEnding(items.length, 'productEndingsDict')}`} />
                    <Button onClick={onCliclClearAll} theme={ThemeButton.CLEAR_COMMENT}>
                        <Text gap="0" text="Удалить всё" bold={TextBold.BOLD} size={TextSize.L} />
                    </Button>

                </div>

                <div className={styles.container}>
                    {
                        items.map((item, index) => (
                            <div key={index} className={styles.box}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={`https://testguru.ru/parser/${item.image}`}
                                        className={styles.image}
                                        alt={item.title}
                                        height="100%"
                                        width="100%"
                                        draggable={false}
                                    />
                                </div>

                                <VStack gap="8" max justify="between" align="start" className={styles.content}>
                                    <HStack max justify="between" align="start">
                                        <VStack align="start" gap="0">
                                            <Text
                                                gap="0"
                                                title={`${formatNumber(item.price)} ₽`}
                                                size={TextSize.M}
                                                bold={TextBold.BOLD}
                                            />
                                            <Text gap="0" text={item.vendor_code} bold={TextBold.MEDIUM} />
                                        </VStack>

                                        <Button theme={ThemeButton.CLEAR_COMMENT}>
                                            <Text gap="0" text="Удалить товар" bold={TextBold.MEDIUM} />
                                        </Button>
                                    </HStack>

                                    <div className={styles.titleContainer}>
                                        <Text
                                            gap="0"
                                            title={`${item.title}`}
                                            size={TextSize.S}
                                            bold={TextBold.MEDIUM}
                                        />
                                    </div>

                                    <Counter />

                                </VStack>

                            </div>
                        ))
                    }

                </div>

                <Checkbox
                    label="Я подтверждаю, что ознакомлен с условиями оферты"
                    checked={checked}
                    id="cartCheck"
                    onToggle={handleChange}
                />
            </div>

            <Button theme={ThemeButton.DEFAULT_BETWEEN}>
                <Text gap="0" isActive title="Оформить" size={TextSize.S} bold={TextBold.LIGHT} />
                <Text
                    gap="0"
                    isActive
                    title={`${formatNumber(totalPrice)} ₽`}
                    size={TextSize.M}
                    bold={TextBold.MEDIUM}
                />
            </Button>

        </div>
    );
});
