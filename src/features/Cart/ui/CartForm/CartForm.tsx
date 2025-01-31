/* eslint-disable ulbi-tv-plugin/layer-imports */
/* eslint-disable react/no-array-index-key */
import {
    ChangeEvent, memo, useCallback, useState,
} from 'react';

import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
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
import {
    addItem, clearItems, minusItem, removeItem,
    setCount,
} from '@/app/Redux/cart/slice';
import { formatNumber } from '@/shared/utils/formatNumber';
import { CartItem } from '@/app/Redux/cart/types';
import { LeaveOrderForm } from '../LeaveOrderForm/LeaveOrderForm';
import { ReactComponent as CloseIcon } from '@/shared/assets/icons/close-icon.svg';
import { addNotification } from '@/app/Redux/notifications/slice.ts';

export interface CartFormProps {
  className?: string;
  onSuccess: () => void;
}

export const CartForm = memo(({ className, onSuccess }: CartFormProps) => {
    const [checked, setChecked] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const [slideIn, setSlideIn] = useState(true);

    const dispatch = useAppDispatch();

    const { items, totalPrice, isOrderModel } = useSelector(selectCart);

    const handleChange = () => {
        setChecked(!checked);
    };

    const onClickClearAll = () => {
        dispatch(clearItems());
        onSuccess();
    };

    const handleClearItems = () => {
        dispatch(clearItems());
    };

    const onClickRemoveItem = (item: CartItem) => {
        dispatch(removeItem(item));
    };

    const handleInputChange = useCallback(
        (number: string, item: CartItem) => {
            const newCount = Number(number);
            if (!Number.isNaN(newCount)) {
                dispatch(setCount({ count: newCount, item }));
            }
        },
        [dispatch],
    );

    const onClickPlusItem = useCallback((item: CartItem) => {
        dispatch(addItem(item));
    }, [dispatch]);

    const onClickMinusItem = useCallback((item: CartItem) => {
        dispatch(minusItem(item));
    }, [dispatch]);

    const handleFormSubmit = () => {
        setSlideIn(false);

        setTimeout(() => {
            setCurrentStep(1);
            setSlideIn(true);
        }, 300);
    };

    const onClickBack = () => {
        setSlideIn(false);

        setTimeout(() => {
            setCurrentStep(0);
            setSlideIn(true);
        }, 300);
    };

    const paymentYooKassa = async () => {
        await axios
            .post(import.meta.env.VITE_PAYMENT_LINK, {
                amount: totalPrice,
            })
            .then((response) => {
                onSuccess();
                dispatch(addNotification({
                    text: 'Переадресация...',
                }));
                dispatch(clearItems());
                window.location.replace(response.data.paymentUrl);
            })
            .catch(() => {
                dispatch(addNotification({
                    text: 'Что-то пошло не так! Повторите попытку позже.',
                }));
            });
    };

    const renderCartForm = (currentStep: number) => {
        switch (currentStep) {
        case 0:
            return (
                <VStack max align="start" justify="between" className={classNames(styles.CartForm, {}, [className])}>
                    <HStack max justify="end">
                        <Button onClick={onSuccess} theme={ThemeButton.CLEAR} className={styles.closeBtn}>
                            <CloseIcon className={styles.closeIcon} />
                        </Button>
                    </HStack>

                    <HStack max justify="between" className={styles.header}>
                        <Text gap="0" title={`${items.length} ${getEnding(items.length, 'productEndingsDict')}`} />
                        <Button onClick={onClickClearAll} theme={ThemeButton.CLEAR_COMMENT}>
                            <Text gap="0" text="Удалить всё" bold={TextBold.BOLD} size={TextSize.L} />
                        </Button>

                    </HStack>

                    <VStack max align="start" className={styles.container}>
                        {
                            items.map((item, index) => (
                                <HStack align="start" max key={index} className={styles.box}>
                                    <div className={styles.imageContainer}>
                                        <img
                                            src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
                                            className={styles.image}
                                            alt={item.title}
                                            height="100%"
                                            width="100%"
                                            draggable={false}
                                        />
                                    </div>

                                    <VStack max gap="8" justify="between" align="start" className={styles.content}>
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

                                            <Button
                                                onClick={() => onClickRemoveItem(item)}
                                                theme={ThemeButton.CLEAR_COMMENT}
                                            >
                                                <Text gap="0" text="Удалить товар" bold={TextBold.MEDIUM} />
                                            </Button>
                                        </HStack>

                                        <div className={styles.titleContainer}>
                                            <Text
                                                gap="0"
                                                title={`${item.title}`}
                                                size={TextSize.M}
                                                bold={TextBold.LIGHT}
                                            />
                                        </div>

                                        <Counter
                                            count={item.count}
                                            onChangeInputValue={
                                                (event: ChangeEvent<HTMLInputElement>) => handleInputChange(
                                                    event?.currentTarget.value,
                                                    item,
                                                )
                                            }
                                            onClickIncrement={() => onClickPlusItem(item)}
                                            onClickDecrement={() => onClickMinusItem(item)}
                                        />

                                    </VStack>

                                </HStack>
                            ))
                        }

                    </VStack>

                    <Checkbox
                        label="Я подтверждаю, что ознакомлен с условиями оферты"
                        checked={checked}
                        id="cartCheck"
                        onToggle={handleChange}
                    />

                    {
                        import.meta.env.VITE_DOMEN_NAME === 'pro-zapchasti.online'
                            ? (
                                <Button
                                    onClick={paymentYooKassa}
                                    disabled={!checked}
                                    theme={ThemeButton.DEFAULT_BETWEEN}
                                >
                                    <Text gap="0" isActive title="Оплатить" size={TextSize.S} bold={TextBold.LIGHT} />
                                    <Text
                                        gap="0"
                                        isActive
                                        title={`${formatNumber(totalPrice)} ₽`}
                                        size={TextSize.M}
                                        bold={TextBold.MEDIUM}
                                    />
                                </Button>
                            )
                            : (
                                <Button
                                    onClick={handleFormSubmit}
                                    disabled={!checked}
                                    theme={ThemeButton.DEFAULT_BETWEEN}
                                >
                                    <Text gap="0" isActive title="Оформить" size={TextSize.S} bold={TextBold.LIGHT} />
                                    <Text
                                        gap="0"
                                        isActive
                                        title={`${formatNumber(totalPrice)} ₽`}
                                        size={TextSize.M}
                                        bold={TextBold.MEDIUM}
                                    />
                                </Button>
                            )
                    }

                </VStack>
            );
        case 1:
            return (
                <LeaveOrderForm
                    isBack
                    onClickBack={onClickBack}
                    onClearCart={handleClearItems}
                    onSuccess={onSuccess}
                />
            );

        default:
            return (
                <VStack max align="start" justify="between" className={classNames(styles.CartForm, {}, [className])}>
                    <HStack max justify="end">
                        <Button onClick={onSuccess} theme={ThemeButton.CLEAR} className={styles.closeBtn}>
                            <CloseIcon className={styles.closeIcon} />
                        </Button>
                    </HStack>

                    <HStack max justify="between" className={styles.header}>
                        <Text gap="0" title={`${items.length} ${getEnding(items.length, 'productEndingsDict')}`} />
                        <Button onClick={onClickClearAll} theme={ThemeButton.CLEAR_COMMENT}>
                            <Text gap="0" text="Удалить всё" bold={TextBold.BOLD} size={TextSize.L} />
                        </Button>

                    </HStack>

                    <VStack max align="start" className={styles.container}>
                        {
                            items.map((item, index) => (
                                <HStack align="start" max key={index} className={styles.box}>
                                    <div className={styles.imageContainer}>
                                        <img
                                            src={`${import.meta.env.VITE_BASE_URL}/${item.image}`}
                                            className={styles.image}
                                            alt={item.title}
                                            height="100%"
                                            width="100%"
                                            draggable={false}
                                        />
                                    </div>

                                    <VStack max gap="8" justify="between" align="start" className={styles.content}>
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

                                            <Button
                                                onClick={() => onClickRemoveItem(item)}
                                                theme={ThemeButton.CLEAR_COMMENT}
                                            >
                                                <Text gap="0" text="Удалить товар" bold={TextBold.MEDIUM} />
                                            </Button>
                                        </HStack>

                                        <div className={styles.titleContainer}>
                                            <Text
                                                gap="0"
                                                title={`${item.title}`}
                                                size={TextSize.M}
                                                bold={TextBold.LIGHT}
                                            />
                                        </div>

                                        <Counter
                                            count={item.count}
                                            onChangeInputValue={
                                                (event: ChangeEvent<HTMLInputElement>) => handleInputChange(
                                                    event?.currentTarget.value,
                                                    item,
                                                )
                                            }
                                            onClickIncrement={() => onClickPlusItem(item)}
                                            onClickDecrement={() => onClickMinusItem(item)}
                                        />

                                    </VStack>

                                </HStack>
                            ))
                        }

                    </VStack>

                    <Checkbox
                        label="Я подтверждаю, что ознакомлен с условиями оферты"
                        checked={checked}
                        id="cartCheck"
                        onToggle={handleChange}
                    />

                    {
                        import.meta.env.VITE_DOMEN_NAME === 'pro-zapchasti.online'
                            ? (
                                <Button
                                    onClick={paymentYooKassa}
                                    disabled={!checked}
                                    theme={ThemeButton.DEFAULT_BETWEEN}
                                >
                                    <Text gap="0" isActive title="Оплатить" size={TextSize.S} bold={TextBold.LIGHT} />
                                    <Text
                                        gap="0"
                                        isActive
                                        title={`${formatNumber(totalPrice)} ₽`}
                                        size={TextSize.M}
                                        bold={TextBold.MEDIUM}
                                    />
                                </Button>
                            )
                            : (
                                <Button
                                    onClick={handleFormSubmit}
                                    disabled={!checked}
                                    theme={ThemeButton.DEFAULT_BETWEEN}
                                >
                                    <Text gap="0" isActive title="Оформить" size={TextSize.S} bold={TextBold.LIGHT} />
                                    <Text
                                        gap="0"
                                        isActive
                                        title={`${formatNumber(totalPrice)} ₽`}
                                        size={TextSize.M}
                                        bold={TextBold.MEDIUM}
                                    />
                                </Button>
                            )
                    }

                </VStack>
            );
        }
    };

    if (isOrderModel) {
        return (
            <LeaveOrderForm onSuccess={onSuccess} />
        );
    }

    if (items.length === 0) {
        return (
            <div className={styles.cartEmpty}>
                <Button onClick={onSuccess} theme={ThemeButton.CLEAR} className={styles.closeBtnEmpty}>
                    <CloseIcon className={styles.closeIcon} />
                </Button>

                <Text gap="0" text="Корзина пуста" />

            </div>
        );
    }

    return (
        <CSSTransition
            in={slideIn}
            timeout={300}
            unmountOnExit
            classNames="slide-animation"
        >
            {
                renderCartForm(currentStep)
            }
        </CSSTransition>
    );
});
